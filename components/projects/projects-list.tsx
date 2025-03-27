"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoreHorizontal, Users, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function ProjectsList() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/public/data/projects.json")
      const data = await response.json()
      setProjects(data)
    }
    fetchProjects()
  }, [])

  const [editingProgress, setEditingProgress] = useState<string | null>(null)
  const [progressValue, setProgressValue] = useState<number>(0)
  const [billingProgressValue, setBillingProgressValue] = useState<number>(0)

  const handleEditProgress = (projectId: string, currentProgress: number, currentBillingProgress: number) => {
    setEditingProgress(projectId)
    setProgressValue(currentProgress)
    setBillingProgressValue(currentBillingProgress)
  }

  const handleSaveProgress = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, progress: progressValue, billingProgress: billingProgressValue }
          : project,
      ),
    )
    setEditingProgress(null)
  }

  const handleCancelEdit = () => {
    setEditingProgress(null)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Proyecto</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Progreso Facturación</TableHead>
            <TableHead>Fecha Real Finalización</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Link href={`/projects/${project.id}`} className="hover:underline">
                    {project.name}
                  </Link>
                </TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "En ejecución"
                        ? "default"
                        : project.status === "En preparación"
                        ? "secondary"
                        : project.status === "Finalizado"
                        ? "success"
                        : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {editingProgress === project.id ? (
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[progressValue]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setProgressValue(value[0])}
                        className="w-[100px]"
                      />
                      <span className="text-xs text-muted-foreground">{progressValue}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 w-[100px]" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingProgress === project.id ? (
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[billingProgressValue]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => setBillingProgressValue(value[0])}
                        className="w-[100px]"
                      />
                      <span className="text-xs text-muted-foreground">{billingProgressValue}%</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Progress value={project.billingProgress} className="h-2 w-[100px]" />
                      <span className="text-xs text-muted-foreground">{project.billingProgress}%</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{project.actualEndDate || "N/A"}</TableCell>
                <TableCell>
                  {editingProgress === project.id ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveProgress(project.id)}
                        className="h-6 w-6"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={handleCancelEdit} className="h-6 w-6">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleEditProgress(project.id, project.progress, project.billingProgress)
                      }
                      className="h-6 w-6"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay proyectos disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Users, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration purposes
const projectsData = [
  {
    id: "1",
    name: "Evaluación de riesgos operativos",
    client: "Banco Nacional",
    clientContact: "Juan Pérez",
    startDate: "15/03/2023",
    endDate: "30/06/2023",
    status: "En ejecución",
    progress: 75,
    manager: "María González",
    professionals: [
      { id: "1", name: "María González", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "2",
    name: "Implementación de controles",
    client: "Seguros del Sur",
    clientContact: "María Rodríguez",
    startDate: "01/04/2023",
    endDate: "15/07/2023",
    status: "En ejecución",
    progress: 45,
    manager: "Carlos Martínez",
    professionals: [
      { id: "2", name: "Carlos Martínez", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "3",
    name: "Auditoría de cumplimiento",
    client: "Comercial Textil",
    clientContact: "Carlos Gómez",
    startDate: "10/05/2023",
    endDate: "30/07/2023",
    status: "En preparación",
    progress: 20,
    manager: "Laura Rodríguez",
    professionals: [
      { id: "3", name: "Laura Rodríguez", role: "Consultor Junior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "4",
    name: "Plan de continuidad de negocio",
    client: "Farmacéutica Global",
    clientContact: "Ana Martínez",
    startDate: "01/02/2023",
    endDate: "15/04/2023",
    status: "Finalizado",
    progress: 100,
    manager: "Javier López",
    professionals: [
      { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: "5",
    name: "Análisis de vulnerabilidades",
    client: "Tech Solutions",
    clientContact: "Roberto Sánchez",
    startDate: "15/04/2023",
    endDate: "15/06/2023",
    status: "En ejecución",
    progress: 60,
    manager: "Ana Torres",
    professionals: [
      { id: "3", name: "Laura Rodríguez", role: "Consultor Junior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
]

export function ProjectsList() {
  const [projects, setProjects] = useState(projectsData)
  const [editingProgress, setEditingProgress] = useState<string | null>(null)
  const [progressValue, setProgressValue] = useState<number>(0)

  const handleEditProgress = (projectId: string, currentProgress: number) => {
    setEditingProgress(projectId)
    setProgressValue(currentProgress)
  }

  const handleSaveProgress = (projectId: string) => {
    setProjects(
      projects.map((project) => (project.id === projectId ? { ...project, progress: progressValue } : project)),
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
            <TableHead>Contraparte</TableHead>
            <TableHead>Fechas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Progreso</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link href={`/projects/${project.id}`} className="hover:underline">
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.clientContact}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs">Inicio: {project.startDate}</span>
                  <span className="text-xs">Fin: {project.endDate}</span>
                </div>
              </TableCell>
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
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 w-[100px]" />
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProgress(project.id, project.progress)}
                      className="h-6 w-6"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>{project.manager}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Users className="mr-2 h-4 w-4" />
                      <span>{project.professionals.length}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Profesionales Asignados</DialogTitle>
                      <DialogDescription>Proyecto: {project.name}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="max-h-[300px] overflow-auto">
                        {project.professionals.map((professional) => (
                          <div key={professional.id} className="flex items-center gap-4 py-2">
                            <Avatar>
                              <AvatarImage src={professional.avatar} alt={professional.name} />
                              <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{professional.name}</p>
                              <p className="text-sm text-muted-foreground">{professional.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <DialogFooter className="sm:justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/projects/${project.id}/team`}>Gestionar Equipo</Link>
                      </Button>
                      <DialogClose asChild>
                        <Button type="button">Cerrar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Editar proyecto</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Asignar profesionales</DropdownMenuItem>
                    <DropdownMenuItem>Actualizar progreso</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Cancelar proyecto</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


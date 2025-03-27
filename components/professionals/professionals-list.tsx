"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
const professionalsData = [
  {
    id: "1",
    name: "María González",
    role: "Consultor Senior",
    utilization: 85,
    projects: [
      { id: "p1", name: "Evaluación de riesgos operativos" },
      { id: "p2", name: "Implementación de controles" },
      { id: "p3", name: "Auditoría de cumplimiento" },
    ],
    specialty: "Riesgos Operativos",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Carlos Martínez",
    role: "Analista de Riesgos",
    utilization: 70,
    projects: [
      { id: "p2", name: "Implementación de controles" },
      { id: "p4", name: "Plan de continuidad de negocio" },
    ],
    specialty: "Riesgos Tecnológicos",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Laura Rodríguez",
    role: "Consultor Junior",
    utilization: 60,
    projects: [
      { id: "p3", name: "Auditoría de cumplimiento" },
      { id: "p5", name: "Análisis de vulnerabilidades" },
    ],
    specialty: "Cumplimiento Regulatorio",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Javier López",
    role: "Consultor Senior",
    utilization: 90,
    projects: [
      { id: "p1", name: "Evaluación de riesgos operativos" },
      { id: "p2", name: "Implementación de controles" },
      { id: "p4", name: "Plan de continuidad de negocio" },
      { id: "p5", name: "Análisis de vulnerabilidades" },
    ],
    specialty: "Gestión de Riesgos",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Ana Torres",
    role: "Analista de Riesgos",
    utilization: 45,
    projects: [{ id: "p3", name: "Auditoría de cumplimiento" }],
    specialty: "Riesgos Financieros",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function ProfessionalsList() {
  const [professionals, setProfessionals] = useState(professionalsData)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profesional</TableHead>
            <TableHead>Especialidad</TableHead>
            <TableHead>Cargo</TableHead>
            <TableHead>Utilización</TableHead>
            <TableHead>Proyectos Asignados</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {professionals.map((professional) => (
            <TableRow key={professional.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={professional.avatar} alt={professional.name} />
                    <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/professionals/${professional.id}`} className="font-medium hover:underline">
                      {professional.name}
                    </Link>
                  </div>
                </div>
              </TableCell>
              <TableCell>{professional.specialty}</TableCell>
              <TableCell>{professional.role}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={professional.utilization}
                    className="h-2 w-[100px]"
                    color={
                      professional.utilization > 80
                        ? "bg-red-500"
                        : professional.utilization > 60
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }
                  />
                  <span className="text-xs text-muted-foreground">{professional.utilization}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {professional.projects.slice(0, 2).map((project) => (
                    <div key={project.id} className="text-sm">
                      {project.name}
                    </div>
                  ))}
                  {professional.projects.length > 2 && (
                    <div className="text-xs text-muted-foreground">+ {professional.projects.length - 2} más</div>
                  )}
                </div>
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
                    <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                    <DropdownMenuItem>Editar información</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver proyectos asignados</DropdownMenuItem>
                    <DropdownMenuItem>Asignar a proyecto</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Desactivar profesional</DropdownMenuItem>
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


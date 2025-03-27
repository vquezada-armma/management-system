"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
const opportunitiesData = [
  {
    id: "1",
    name: "Evaluación de riesgos tecnológicos",
    client: "TechSolutions",
    value: "$45,000",
    estimatedCloseDate: "30/06/2023",
    stage: "Propuesta Enviada",
    probability: 60,
    manager: "María González",
  },
  {
    id: "2",
    name: "Plan de continuidad de negocio",
    client: "Constructora Nacional",
    value: "$30,000",
    estimatedCloseDate: "15/07/2023",
    stage: "Negociación",
    probability: 75,
    manager: "Carlos Martínez",
  },
  {
    id: "3",
    name: "Análisis de vulnerabilidades",
    client: "Financiera Regional",
    value: "$18,000",
    estimatedCloseDate: "10/08/2023",
    stage: "Lead",
    probability: 30,
    manager: "Laura Rodríguez",
  },
  {
    id: "4",
    name: "Gestión de riesgos de proyecto",
    client: "Farmacéutica Global",
    value: "$25,000",
    estimatedCloseDate: "20/06/2023",
    stage: "Cierre",
    probability: 90,
    manager: "Javier López",
  },
  {
    id: "5",
    name: "Desarrollo de políticas de seguridad",
    client: "Banco Nacional",
    value: "$15,000",
    estimatedCloseDate: "05/07/2023",
    stage: "Propuesta Enviada",
    probability: 55,
    manager: "Ana Torres",
  },
]

export function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState(opportunitiesData)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Oportunidad</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead>Fecha Est. Cierre</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Probabilidad</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity.id}>
              <TableCell className="font-medium">
                <Link href={`/opportunities/${opportunity.id}`} className="hover:underline">
                  {opportunity.name}
                </Link>
              </TableCell>
              <TableCell>{opportunity.client}</TableCell>
              <TableCell className="text-right">{opportunity.value}</TableCell>
              <TableCell>{opportunity.estimatedCloseDate}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    opportunity.stage === "Cierre"
                      ? "default"
                      : opportunity.stage === "Negociación"
                        ? "secondary"
                        : opportunity.stage === "Propuesta Enviada"
                          ? "outline"
                          : "destructive"
                  }
                >
                  {opportunity.stage}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={opportunity.probability}
                    className="h-2 w-[100px]"
                    color={
                      opportunity.probability > 75
                        ? "bg-green-500"
                        : opportunity.probability > 50
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }
                  />
                  <span className="text-xs text-muted-foreground">{opportunity.probability}%</span>
                </div>
              </TableCell>
              <TableCell>{opportunity.manager}</TableCell>
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
                    <DropdownMenuItem>Editar oportunidad</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Avanzar a siguiente etapa</DropdownMenuItem>
                    <DropdownMenuItem>Convertir a proyecto</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Marcar como perdida</DropdownMenuItem>
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


"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
const clientsData = [
  {
    id: "1",
    name: "Banco Nacional",
    sector: "Banca y Finanzas",
    contactName: "Juan Pérez",
    contactEmail: "jperez@banconacional.com",
    contactPhone: "+1 (555) 123-4567",
    address: "Av. Principal 123, Ciudad",
    activeProjects: 3,
  },
  {
    id: "2",
    name: "Seguros del Sur",
    sector: "Seguros",
    contactName: "María Rodríguez",
    contactEmail: "mrodriguez@segurosdelsur.com",
    contactPhone: "+1 (555) 234-5678",
    address: "Calle Secundaria 456, Ciudad",
    activeProjects: 2,
  },
  {
    id: "3",
    name: "Comercial Textil",
    sector: "Comercio",
    contactName: "Carlos Gómez",
    contactEmail: "cgomez@comercialtextil.com",
    contactPhone: "+1 (555) 345-6789",
    address: "Plaza Central 789, Ciudad",
    activeProjects: 1,
  },
  {
    id: "4",
    name: "Farmacéutica Global",
    sector: "Salud",
    contactName: "Ana Martínez",
    contactEmail: "amartinez@farmaceuticaglobal.com",
    contactPhone: "+1 (555) 456-7890",
    address: "Av. de la Salud 321, Ciudad",
    activeProjects: 1,
  },
  {
    id: "5",
    name: "Tech Solutions",
    sector: "Tecnología",
    contactName: "Roberto Sánchez",
    contactEmail: "rsanchez@techsolutions.com",
    contactPhone: "+1 (555) 567-8901",
    address: "Parque Tecnológico 654, Ciudad",
    activeProjects: 2,
  },
]

export function ClientsList() {
  const [clients, setClients] = useState(clientsData)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Cliente</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Contacto Principal</TableHead>
            <TableHead>Información de Contacto</TableHead>
            <TableHead>Proyectos Activos</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                <Link href={`/clients/${client.id}`} className="hover:underline">
                  {client.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{client.sector}</Badge>
              </TableCell>
              <TableCell>{client.contactName}</TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-xs">
                    <Mail className="mr-1 h-3 w-3" />
                    {client.contactEmail}
                  </div>
                  <div className="flex items-center text-xs">
                    <Phone className="mr-1 h-3 w-3" />
                    {client.contactPhone}
                  </div>
                  <div className="flex items-center text-xs">
                    <MapPin className="mr-1 h-3 w-3" />
                    {client.address}
                  </div>
                </div>
              </TableCell>
              <TableCell>{client.activeProjects}</TableCell>
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
                    <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver proyectos</DropdownMenuItem>
                    <DropdownMenuItem>Crear nuevo proyecto</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Desactivar cliente</DropdownMenuItem>
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


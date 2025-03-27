"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoreHorizontal, Mail, Building, User } from "lucide-react"
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
import LocalStorageService, { type Client } from "@/lib/local-storage-service"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export function ClientsList() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const storageService = LocalStorageService.getInstance()
      const clientsData = storageService.getClients()
      setClients(clientsData)
    } catch (error) {
      console.error("Error al cargar clientes:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos de clientes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div>Cargando clientes...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del Cliente</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Contacto Principal</TableHead>
            <TableHead>Información de Contacto</TableHead>
            <TableHead>Proyectos</TableHead>
            <TableHead>Relacionamiento</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                <Link href={`/clients/${client.id}`} className="hover:underline">
                  {client.nombre_cliente}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{client.tipo_empresa}</Badge>
              </TableCell>
              <TableCell>{client.nombre_contacto}</TableCell>
              <TableCell>
                <div className="flex flex-col space-y-1">
                  {client.correo && (
                    <div className="flex items-center text-xs">
                      <Mail className="mr-1 h-3 w-3" />
                      {client.correo}
                    </div>
                  )}
                  {client.cargo && (
                    <div className="flex items-center text-xs">
                      <User className="mr-1 h-3 w-3" />
                      {client.cargo}
                    </div>
                  )}
                  {client.area && (
                    <div className="flex items-center text-xs">
                      <Building className="mr-1 h-3 w-3" />
                      {client.area}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={client.marca_proyectos === "Sí" ? "default" : "outline"}>
                  {client.numero_proyectos}
                </Badge>
              </TableCell>
              <TableCell>
                {client.nivel_relacionamiento && (
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${client.nivel_relacionamiento * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{client.nivel_relacionamiento}/10</span>
                  </div>
                )}
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
      <Toaster />
    </div>
  )
}


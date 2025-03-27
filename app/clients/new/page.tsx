"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import LocalStorageService from "@/lib/local-storage-service"

export default function NewClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    address: "",
    description: "",
    contactName: "",
    contactPosition: "",
    contactEmail: "",
    contactPhone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, sector: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear el objeto de cliente
      const clientData = {
        name: formData.name,
        sector: formData.sector,
        address: formData.address,
        description: formData.description,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        activeProjects: 0,
      }

      // Guardar en el almacenamiento local
      const storageService = LocalStorageService.getInstance()
      const savedClient = storageService.saveClient(clientData)

      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente",
      })

      // Redireccionar a la lista de clientes
      setTimeout(() => {
        router.push("/clients")
      }, 1500)
    } catch (error) {
      console.error("Error al guardar el cliente:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el cliente",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Cliente</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Ingrese los detalles del nuevo cliente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="name">Nombre del Cliente</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Banco Nacional"
                  required
                />
                <FormDescription>Nombre completo de la empresa cliente</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Sector</FormLabel>
                <Select value={formData.sector} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banca y Finanzas">Banca y Finanzas</SelectItem>
                    <SelectItem value="Seguros">Seguros</SelectItem>
                    <SelectItem value="Comercio">Comercio</SelectItem>
                    <SelectItem value="Manufactura">Manufactura</SelectItem>
                    <SelectItem value="Tecnología">Tecnología</SelectItem>
                    <SelectItem value="Salud">Salud</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Industria o sector al que pertenece el cliente</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="address">Dirección</FormLabel>
              <Input
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Ej: Av. Principal 123, Ciudad"
              />
              <FormDescription>Dirección física de la empresa</FormDescription>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Breve descripción del cliente y su negocio"
                className="min-h-[100px]"
              />
              <FormDescription>Información adicional relevante sobre el cliente</FormDescription>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Contacto Principal</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="contactName">Nombre del Contacto</FormLabel>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                  <FormDescription>Nombre completo de la persona de contacto</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contactPosition">Cargo</FormLabel>
                  <Input
                    id="contactPosition"
                    value={formData.contactPosition}
                    onChange={handleInputChange}
                    placeholder="Ej: Gerente de Riesgos"
                  />
                  <FormDescription>Posición que ocupa en la empresa</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contactEmail">Correo Electrónico</FormLabel>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="Ej: jperez@empresa.com"
                    required
                  />
                  <FormDescription>Correo electrónico de contacto</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contactPhone">Teléfono</FormLabel>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Ej: +1 (555) 123-4567"
                  />
                  <FormDescription>Número telefónico de contacto</FormDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/clients")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Crear Cliente"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}


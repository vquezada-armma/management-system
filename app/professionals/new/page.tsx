"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import LocalStorageService from "@/lib/local-storage-service"

export default function NewProfessionalPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialty: "",
    email: "",
    phone: "",
    position: "",
    utilization: 0,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear el objeto de profesional
      const professionalData = {
        name: formData.name,
        role: formData.role,
        specialty: formData.specialty,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
        utilization: Number.parseInt(formData.utilization.toString()) || 0,
        projects: [],
        avatar: "/placeholder.svg?height=40&width=40",
      }

      // Guardar en el almacenamiento local
      const storageService = LocalStorageService.getInstance()
      const savedProfessional = storageService.saveProfessional(professionalData)

      toast({
        title: "Profesional creado",
        description: "El profesional ha sido creado exitosamente",
      })

      // Redireccionar a la lista de profesionales
      setTimeout(() => {
        router.push("/professionals")
      }, 1500)
    } catch (error) {
      console.error("Error al guardar el profesional:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el profesional",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Profesional</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Profesional</CardTitle>
            <CardDescription>Ingrese los detalles del nuevo profesional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="name">Nombre Completo</FormLabel>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: María González"
                  required
                />
                <FormDescription>Nombre y apellido del profesional</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="position">Cargo</FormLabel>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Ej: Consultor Senior de Riesgos Operativos"
                />
                <FormDescription>Cargo completo del profesional</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Rol</FormLabel>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Consultor Senior">Consultor Senior</SelectItem>
                    <SelectItem value="Consultor Junior">Consultor Junior</SelectItem>
                    <SelectItem value="Analista de Riesgos">Analista de Riesgos</SelectItem>
                    <SelectItem value="Gerente de Proyecto">Gerente de Proyecto</SelectItem>
                    <SelectItem value="Especialista Técnico">Especialista Técnico</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Rol principal en los proyectos</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Especialidad</FormLabel>
                <Select
                  value={formData.specialty}
                  onValueChange={(value) => handleSelectChange("specialty", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Riesgos Operativos">Riesgos Operativos</SelectItem>
                    <SelectItem value="Riesgos Tecnológicos">Riesgos Tecnológicos</SelectItem>
                    <SelectItem value="Riesgos Financieros">Riesgos Financieros</SelectItem>
                    <SelectItem value="Cumplimiento Regulatorio">Cumplimiento Regulatorio</SelectItem>
                    <SelectItem value="Gestión de Riesgos">Gestión de Riesgos</SelectItem>
                    <SelectItem value="Seguridad de la Información">Seguridad de la Información</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Área de especialización</FormDescription>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: mgonzalez@riskconsulting.com"
                  required
                />
                <FormDescription>Correo electrónico corporativo</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel htmlFor="phone">Teléfono</FormLabel>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ej: +1 (555) 123-4567"
                />
                <FormDescription>Número telefónico de contacto</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="utilization">Utilización Inicial (%)</FormLabel>
              <Input
                id="utilization"
                type="number"
                min="0"
                max="100"
                value={formData.utilization}
                onChange={handleInputChange}
                placeholder="Ej: 0"
              />
              <FormDescription>Porcentaje de ocupación inicial (0-100%)</FormDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/professionals")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Crear Profesional"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}


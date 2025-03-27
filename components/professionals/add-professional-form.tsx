"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import LocalStorageService from "@/lib/local-storage-service"

interface AddProfessionalFormProps {
  onProfessionalAdded: () => void
}

export function AddProfessionalForm({ onProfessionalAdded }: AddProfessionalFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialty: "",
    email: "",
    phone: "",
    position: "",
    utilization: 0,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const professionalData = {
        ...formData,
        utilization: Number.parseInt(formData.utilization.toString()) || 0,
        projects: [],
        avatar: "/placeholder.svg?height=40&width=40",
      }

      const storageService = LocalStorageService.getInstance()
      await storageService.saveProfessional(professionalData)

      toast({
        title: "Profesional creado",
        description: "El profesional ha sido creado exitosamente",
      })

      setOpen(false)
      setFormData({
        name: "",
        role: "",
        specialty: "",
        email: "",
        phone: "",
        position: "",
        utilization: 0,
      })

      onProfessionalAdded()
    } catch (error) {
      console.error("Error al crear profesional:", error)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Profesional
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Profesional</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo profesional. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: María González"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Ej: Consultor Senior de Riesgos"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                  <SelectTrigger id="role">
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleSelectChange("specialty", value)}>
                  <SelectTrigger id="specialty">
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
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: mgonzalez@riskconsulting.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Ej: +1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="utilization">Utilización Inicial (%)</Label>
              <Input
                id="utilization"
                type="number"
                min="0"
                max="100"
                value={formData.utilization}
                onChange={handleInputChange}
                placeholder="Ej: 0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Profesional"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { PlusCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import LocalStorageService from "@/lib/local-storage-service"

interface AddClientFormProps {
  onClientAdded: () => void
}

export function AddClientForm({ onClientAdded }: AddClientFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nombre_cliente: "",
    nombre_contacto: "",
    correo: "",
    area: "",
    tipo_empresa: "",
    detalle_empresa: "",
    cargo: "",
    nivel_responsabilidad: "",
    marca_proyectos: "No" as "Sí" | "No",
    numero_proyectos: 0,
    persona_relacionamiento: "",
    nivel_relacionamiento: 5,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRelacionamientoChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, nivel_relacionamiento: value[0] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const storageService = LocalStorageService.getInstance()
      await storageService.saveClient(formData)

      toast({
        title: "Cliente creado",
        description: "El cliente ha sido creado exitosamente",
      })

      setOpen(false)
      setFormData({
        nombre_cliente: "",
        nombre_contacto: "",
        correo: "",
        area: "",
        tipo_empresa: "",
        detalle_empresa: "",
        cargo: "",
        nivel_responsabilidad: "",
        marca_proyectos: "No",
        numero_proyectos: 0,
        persona_relacionamiento: "",
        nivel_relacionamiento: 5,
      })

      onClientAdded()
    } catch (error) {
      console.error("Error al crear cliente:", error)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo cliente. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre_cliente">Nombre del Cliente</Label>
                <Input
                  id="nombre_cliente"
                  value={formData.nombre_cliente}
                  onChange={handleInputChange}
                  placeholder="Ej: Banco Nacional"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo_empresa">Tipo de Empresa</Label>
                <Select
                  value={formData.tipo_empresa}
                  onValueChange={(value) => handleSelectChange("tipo_empresa", value)}
                >
                  <SelectTrigger id="tipo_empresa">
                    <SelectValue placeholder="Seleccionar tipo" />
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
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detalle_empresa">Detalle de la Empresa</Label>
              <Textarea
                id="detalle_empresa"
                value={formData.detalle_empresa}
                onChange={handleInputChange}
                placeholder="Breve descripción de la empresa"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre_contacto">Nombre del Contacto</Label>
                <Input
                  id="nombre_contacto"
                  value={formData.nombre_contacto}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleInputChange}
                  placeholder="Ej: jperez@empresa.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  placeholder="Ej: Gerente de Riesgos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área</Label>
                <Input id="area" value={formData.area} onChange={handleInputChange} placeholder="Ej: Riesgos" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nivel_responsabilidad">Nivel de Responsabilidad</Label>
              <Select
                value={formData.nivel_responsabilidad}
                onValueChange={(value) => handleSelectChange("nivel_responsabilidad", value)}
              >
                <SelectTrigger id="nivel_responsabilidad">
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alto">Alto</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Bajo">Bajo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="persona_relacionamiento">Persona de Relacionamiento</Label>
                <Input
                  id="persona_relacionamiento"
                  value={formData.persona_relacionamiento}
                  onChange={handleInputChange}
                  placeholder="Ej: María González"
                />
              </div>
              <div className="space-y-2">
                <Label>Nivel de Relacionamiento ({formData.nivel_relacionamiento}/10)</Label>
                <Slider
                  value={[formData.nivel_relacionamiento]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={handleRelacionamientoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>¿Tiene Proyectos?</Label>
              <Select
                value={formData.marca_proyectos}
                onValueChange={(value) => handleSelectChange("marca_proyectos", value as "Sí" | "No")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.marca_proyectos === "Sí" && (
              <div className="space-y-2">
                <Label htmlFor="numero_proyectos">Número de Proyectos</Label>
                <Input
                  id="numero_proyectos"
                  type="number"
                  min="1"
                  value={formData.numero_proyectos}
                  onChange={handleInputChange}
                  placeholder="Ej: 1"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


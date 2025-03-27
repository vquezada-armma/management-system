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
import { PlusCircle, CalendarIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import LocalStorageService from "@/lib/local-storage-service"

interface AddOpportunityFormProps {
  onOpportunityAdded: () => void
}

export function AddOpportunityForm({ onOpportunityAdded }: AddOpportunityFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [closeDate, setCloseDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    value: "",
    description: "",
    manager: "",
    stage: "lead",
    probability: 30,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProbabilityChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, probability: value[0] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear el objeto de oportunidad
      const opportunityData = {
        name: formData.name,
        client: formData.client,
        value: formData.value.startsWith("$") ? formData.value : `$${formData.value}`,
        description: formData.description,
        estimatedCloseDate: closeDate ? closeDate.toLocaleDateString() : "",
        stage:
          formData.stage === "lead"
            ? "Lead"
            : formData.stage === "proposal"
              ? "Propuesta Enviada"
              : formData.stage === "negotiation"
                ? "Negociación"
                : "Cierre",
        probability: formData.probability,
        manager: formData.manager,
        history: [],
      }

      // Guardar en el almacenamiento local
      const storageService = LocalStorageService.getInstance()
      await storageService.saveOpportunity(opportunityData)

      toast({
        title: "Oportunidad creada",
        description: "La oportunidad ha sido creada exitosamente",
      })

      setOpen(false)
      setFormData({
        name: "",
        client: "",
        value: "",
        description: "",
        manager: "",
        stage: "lead",
        probability: 30,
      })
      setCloseDate(undefined)

      onOpportunityAdded()
    } catch (error) {
      console.error("Error al guardar la oportunidad:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear la oportunidad",
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
          Nueva Oportunidad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Añadir Nueva Oportunidad</DialogTitle>
            <DialogDescription>
              Complete la información de la nueva oportunidad. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Oportunidad</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Evaluación de Riesgos Tecnológicos"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select value={formData.client} onValueChange={(value) => handleSelectChange("client", value)}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Banco Nacional">Banco Nacional</SelectItem>
                    <SelectItem value="Seguros del Sur">Seguros del Sur</SelectItem>
                    <SelectItem value="Comercial Textil">Comercial Textil</SelectItem>
                    <SelectItem value="Farmacéutica Global">Farmacéutica Global</SelectItem>
                    <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                    <SelectItem value="Constructora Nacional">Constructora Nacional</SelectItem>
                    <SelectItem value="Financiera Regional">Financiera Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Valor Estimado</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="Ej: 25000"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Fecha Estimada de Cierre</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !closeDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {closeDate ? closeDate.toLocaleDateString() : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={closeDate} onSelect={setCloseDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe el alcance y objetivos de la oportunidad"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager">Responsable</Label>
                <Select value={formData.manager} onValueChange={(value) => handleSelectChange("manager", value)}>
                  <SelectTrigger id="manager">
                    <SelectValue placeholder="Seleccionar responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="María González">María González</SelectItem>
                    <SelectItem value="Carlos Martínez">Carlos Martínez</SelectItem>
                    <SelectItem value="Laura Rodríguez">Laura Rodríguez</SelectItem>
                    <SelectItem value="Javier López">Javier López</SelectItem>
                    <SelectItem value="Ana Torres">Ana Torres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Etapa</Label>
                <Select value={formData.stage} onValueChange={(value) => handleSelectChange("stage", value)}>
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Seleccionar etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="proposal">Propuesta Enviada</SelectItem>
                    <SelectItem value="negotiation">Negociación</SelectItem>
                    <SelectItem value="closing">Cierre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Probabilidad de Cierre ({formData.probability}%)</Label>
              <Slider
                value={[formData.probability]}
                min={0}
                max={100}
                step={5}
                onValueChange={handleProbabilityChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Oportunidad"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


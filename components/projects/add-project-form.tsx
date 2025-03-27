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

interface AddProjectFormProps {
  onProjectAdded: () => void
}

export function AddProjectForm({ onProjectAdded }: AddProjectFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    clientContact: "",
    description: "",
    manager: "",
    status: "preparation",
    progress: 0,
    billingPlan: [], // Plan de facturación
    documents: [], // Documentos
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleProgressChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, progress: value[0] }))
  }

  const handleAddBillingPlan = () => {
    setFormData((prev) => ({
      ...prev,
      billingPlan: [...prev.billingPlan, { id: Date.now().toString(), percentage: 0, dueDate: "", status: "Pendiente" }],
    }))
  }

  const handleBillingPlanChange = (index: number, field: string, value: string | number) => {
    setFormData((prev) => {
      const updatedPlan = [...prev.billingPlan]
      updatedPlan[index] = { ...updatedPlan[index], [field]: value }
      return { ...prev, billingPlan: updatedPlan }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Crear el objeto de proyecto
      const projectData = {
        name: formData.name,
        client: formData.client,
        clientContact: formData.clientContact,
        description: formData.description,
        startDate: startDate ? startDate.toLocaleDateString() : "",
        endDate: endDate ? endDate.toLocaleDateString() : "",
        status:
          formData.status === "preparation"
            ? "En preparación"
            : formData.status === "execution"
              ? "En ejecución"
              : formData.status === "finished"
                ? "Finalizado"
                : "Cancelado",
        progress: formData.progress,
        manager: formData.manager,
        professionals: [],
        documents: [],
      }

      // Guardar en el almacenamiento local
      const storageService = LocalStorageService.getInstance()
      await storageService.saveProject(projectData)

      toast({
        title: "Proyecto creado",
        description: "El proyecto ha sido creado exitosamente",
      })

      setOpen(false)
      setFormData({
        name: "",
        client: "",
        clientContact: "",
        description: "",
        manager: "",
        status: "preparation",
        progress: 0,
        billingPlan: [],
        documents: [],
      })
      setStartDate(undefined)
      setEndDate(undefined)

      onProjectAdded()
    } catch (error) {
      console.error("Error al guardar el proyecto:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el proyecto",
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
          Nuevo Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo proyecto. Haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proyecto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Evaluación de Riesgos Operativos"
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientContact">Contraparte (Responsable por parte del cliente)</Label>
              <Select
                value={formData.clientContact}
                onValueChange={(value) => handleSelectChange("clientContact", value)}
              >
                <SelectTrigger id="clientContact">
                  <SelectValue placeholder="Seleccionar contraparte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Juan Pérez">Juan Pérez (Banco Nacional)</SelectItem>
                  <SelectItem value="María Rodríguez">María Rodríguez (Seguros del Sur)</SelectItem>
                  <SelectItem value="Carlos Gómez">Carlos Gómez (Comercial Textil)</SelectItem>
                  <SelectItem value="Ana Martínez">Ana Martínez (Farmacéutica Global)</SelectItem>
                  <SelectItem value="Roberto Sánchez">Roberto Sánchez (Tech Solutions)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe el alcance y objetivos del proyecto"
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manager">Responsable del Proyecto</Label>
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
                <Label>Fecha de Inicio</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? startDate.toLocaleDateString() : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Fecha de Entrega</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? endDate.toLocaleDateString() : "Seleccionar fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado Inicial</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preparation">En preparación</SelectItem>
                  <SelectItem value="execution">En ejecución</SelectItem>
                  <SelectItem value="finished">Finalizado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Progreso Inicial ({formData.progress}%)</Label>
              <Slider value={[formData.progress]} min={0} max={100} step={5} onValueChange={handleProgressChange} />
            </div>

            <div className="space-y-4">
              <Label>Plan de Facturación</Label>
              {formData.billingPlan.map((payment, index) => (
                <div key={payment.id} className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={payment.percentage}
                    onChange={(e) => handleBillingPlanChange(index, "percentage", Number(e.target.value))}
                    placeholder="Porcentaje"
                    className="w-20"
                  />
                  <Input
                    type="date"
                    value={payment.dueDate}
                    onChange={(e) => handleBillingPlanChange(index, "dueDate", e.target.value)}
                    className="w-40"
                  />
                  <span className="text-sm">{payment.status}</span>
                </div>
              ))}
              <Button type="button" onClick={handleAddBillingPlan}>
                Añadir Pago
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


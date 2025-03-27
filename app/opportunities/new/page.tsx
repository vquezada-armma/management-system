"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { FormLabel } from "@/components/ui/form"
import { FormDescription } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import LocalStorageService from "@/lib/local-storage-service"

export default function NewOpportunityPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    value: "",
    description: "",
    manager: "",
    stage: "lead",
    probability: 30,
  })
  const [closeDate, setCloseDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProbabilityChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, probability: value[0] }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
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
      const savedOpportunity = storageService.saveOpportunity(opportunityData)

      toast({
        title: "Oportunidad creada",
        description: "La oportunidad ha sido creada exitosamente",
      })

      // Redireccionar a la lista de oportunidades
      setTimeout(() => {
        router.push("/opportunities")
      }, 1500)
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
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Crear Nueva Oportunidad</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información de la Oportunidad</CardTitle>
            <CardDescription>Ingrese los detalles de la nueva oportunidad de negocio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="name">Nombre de la Oportunidad</FormLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Evaluación de Riesgos Tecnológicos"
                  required
                />
                <FormDescription>Nombre descriptivo de la oportunidad</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Cliente</FormLabel>
                <Select
                  name="client"
                  value={formData.client}
                  onValueChange={(value) => handleSelectChange("client", value)}
                >
                  <SelectTrigger>
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
                <FormDescription>Empresa para la cual se desarrollaría el proyecto</FormDescription>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="value">Valor Estimado</FormLabel>
                <Input
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="Ej: 25000"
                  required
                />
                <FormDescription>Valor estimado del proyecto en dólares</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Fecha Estimada de Cierre</FormLabel>
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
                <FormDescription>Fecha estimada para cerrar la oportunidad</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe el alcance y objetivos de la oportunidad"
                className="min-h-[100px]"
              />
              <FormDescription>Breve descripción de la oportunidad, alcance y objetivos principales</FormDescription>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel>Responsable de la Oportunidad</FormLabel>
                <Select
                  name="manager"
                  value={formData.manager}
                  onValueChange={(value) => handleSelectChange("manager", value)}
                >
                  <SelectTrigger>
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
                <FormDescription>Consultor responsable de la oportunidad</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Etapa</FormLabel>
                <Select
                  name="stage"
                  value={formData.stage}
                  onValueChange={(value) => handleSelectChange("stage", value)}
                  defaultValue="lead"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar etapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="proposal">Propuesta Enviada</SelectItem>
                    <SelectItem value="negotiation">Negociación</SelectItem>
                    <SelectItem value="closing">Cierre</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Etapa actual de la oportunidad</FormDescription>
              </div>
            </div>

            <div className="space-y-4">
              <FormLabel>Probabilidad de Cierre ({formData.probability}%)</FormLabel>
              <Slider
                defaultValue={[30]}
                max={100}
                step={5}
                value={[formData.probability]}
                onValueChange={handleProbabilityChange}
              />
              <FormDescription>Probabilidad estimada de convertir esta oportunidad en proyecto</FormDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/opportunities")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Crear Oportunidad"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  )
}


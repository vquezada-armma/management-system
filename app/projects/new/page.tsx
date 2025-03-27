"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

const clients = [
  { value: "banco-nacional", label: "Banco Nacional" },
  { value: "seguros-del-sur", label: "Seguros del Sur" },
  { value: "comercial-textil", label: "Comercial Textil" },
  { value: "farmaceutica-global", label: "Farmacéutica Global" },
  { value: "tech-solutions", label: "Tech Solutions" },
]

const managers = [
  { value: "maria-gonzalez", label: "María González" },
  { value: "carlos-martinez", label: "Carlos Martínez" },
  { value: "laura-rodriguez", label: "Laura Rodríguez" },
  { value: "javier-lopez", label: "Javier López" },
  { value: "ana-torres", label: "Ana Torres" },
]

const clientContacts = {
  "banco-nacional": [
    { value: "juan-perez", label: "Juan Pérez (Gerente de Riesgos)" },
    { value: "sofia-gomez", label: "Sofía Gómez (Directora de Operaciones)" },
  ],
  "seguros-del-sur": [
    { value: "maria-rodriguez", label: "María Rodríguez (Gerente General)" },
    { value: "roberto-diaz", label: "Roberto Díaz (Jefe de Cumplimiento)" },
  ],
  "comercial-textil": [{ value: "carlos-gomez", label: "Carlos Gómez (Director Financiero)" }],
  "farmaceutica-global": [
    { value: "ana-martinez", label: "Ana Martínez (Gerente de Calidad)" },
    { value: "luis-morales", label: "Luis Morales (Director de Operaciones)" },
  ],
  "tech-solutions": [
    { value: "roberto-sanchez", label: "Roberto Sánchez (CTO)" },
    { value: "patricia-vega", label: "Patricia Vega (CISO)" },
  ],
}

export default function NewProjectPage() {
  const router = useRouter()
  const [openClient, setOpenClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")
  const [openContact, setOpenContact] = useState(false)
  const [selectedContact, setSelectedContact] = useState("")
  const [openManager, setOpenManager] = useState(false)
  const [selectedManager, setSelectedManager] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [progress, setProgress] = useState([0])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí iría la lógica para guardar el proyecto
    console.log({
      client: selectedClient,
      contact: selectedContact,
      manager: selectedManager,
      startDate,
      endDate,
      progress: progress[0],
    })
    // Redireccionar a la lista de proyectos
    router.push("/projects")
  }

  // Filtrar contactos basados en el cliente seleccionado
  const availableContacts = selectedClient ? clientContacts[selectedClient as keyof typeof clientContacts] || [] : []

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Proyecto</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Proyecto</CardTitle>
            <CardDescription>Ingrese los detalles básicos del nuevo proyecto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="project-name">Nombre del Proyecto</FormLabel>
                <Input id="project-name" placeholder="Ej: Evaluación de Riesgos Operativos" required />
                <FormDescription>Nombre descriptivo del proyecto</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Cliente</FormLabel>
                <Popover open={openClient} onOpenChange={setOpenClient}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openClient}
                      className="w-full justify-between"
                    >
                      {selectedClient
                        ? clients.find((client) => client.value === selectedClient)?.label
                        : "Seleccionar cliente"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar cliente..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              key={client.value}
                              value={client.value}
                              onSelect={(currentValue) => {
                                const newValue = currentValue === selectedClient ? "" : currentValue
                                setSelectedClient(newValue)
                                if (newValue !== selectedClient) {
                                  setSelectedContact("")
                                }
                                setOpenClient(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedClient === client.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {client.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Empresa para la cual se realiza el proyecto</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel>Contraparte (Responsable por parte del cliente)</FormLabel>
              <Popover open={openContact} onOpenChange={setOpenContact}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openContact}
                    className="w-full justify-between"
                    disabled={!selectedClient}
                  >
                    {selectedContact && availableContacts.length > 0
                      ? availableContacts.find((contact) => contact.value === selectedContact)?.label
                      : selectedClient
                        ? "Seleccionar contraparte"
                        : "Primero seleccione un cliente"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar contraparte..." />
                    <CommandList>
                      <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                      <CommandGroup>
                        {availableContacts.map((contact) => (
                          <CommandItem
                            key={contact.value}
                            value={contact.value}
                            onSelect={(currentValue) => {
                              setSelectedContact(currentValue === selectedContact ? "" : currentValue)
                              setOpenContact(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedContact === contact.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {contact.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Persona responsable del proyecto por parte del cliente</FormDescription>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                id="description"
                placeholder="Describe el alcance y objetivos del proyecto"
                className="min-h-[100px]"
              />
              <FormDescription>Breve descripción del proyecto, alcance y objetivos principales</FormDescription>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <FormLabel>Responsable del Proyecto</FormLabel>
                <Popover open={openManager} onOpenChange={setOpenManager}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openManager}
                      className="w-full justify-between"
                    >
                      {selectedManager
                        ? managers.find((manager) => manager.value === selectedManager)?.label
                        : "Seleccionar responsable"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar responsable..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                        <CommandGroup>
                          {managers.map((manager) => (
                            <CommandItem
                              key={manager.value}
                              value={manager.value}
                              onSelect={(currentValue) => {
                                setSelectedManager(currentValue === selectedManager ? "" : currentValue)
                                setOpenManager(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedManager === manager.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {manager.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>Consultor principal a cargo del proyecto</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Fecha de Inicio</FormLabel>
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
                <FormDescription>Fecha estimada de inicio del proyecto</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Fecha de Entrega</FormLabel>
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
                <FormDescription>Fecha estimada de finalización del proyecto</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel>Estado Inicial</FormLabel>
              <Select defaultValue="preparation">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preparation">En preparación</SelectItem>
                  <SelectItem value="execution">En ejecución</SelectItem>
                  <SelectItem value="finished">Finalizado</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Estado con el que iniciará el proyecto</FormDescription>
            </div>

            <div className="space-y-4">
              <FormLabel>Progreso Inicial ({progress}%)</FormLabel>
              <Slider defaultValue={[0]} max={100} step={5} value={progress} onValueChange={setProgress} />
              <FormDescription>Porcentaje de avance inicial del proyecto</FormDescription>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/projects")}>
              Cancelar
            </Button>
            <Button type="submit">Crear Proyecto</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}


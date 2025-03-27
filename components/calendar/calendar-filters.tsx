"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function CalendarFilters() {
  const [openClient, setOpenClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")

  const clients = [
    { value: "all", label: "Todos los clientes" },
    { value: "banco-nacional", label: "Banco Nacional" },
    { value: "seguros-del-sur", label: "Seguros del Sur" },
    { value: "comercial-textil", label: "Comercial Textil" },
    { value: "farmaceutica-global", label: "Farmacéutica Global" },
    { value: "tech-solutions", label: "Tech Solutions" },
  ]

  const professionals = [
    { id: "1", name: "María González" },
    { id: "2", name: "Carlos Martínez" },
    { id: "3", name: "Laura Rodríguez" },
    { id: "4", name: "Javier López" },
    { id: "5", name: "Ana Torres" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium">Cliente</div>
        <Popover open={openClient} onOpenChange={setOpenClient}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={openClient} className="w-full justify-between">
              {selectedClient ? clients.find((client) => client.value === selectedClient)?.label : "Todos los clientes"}
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
                        setSelectedClient(currentValue === selectedClient ? "" : currentValue)
                        setOpenClient(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedClient === client.value ? "opacity-100" : "opacity-0")}
                      />
                      {client.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Profesionales</div>
        <div className="space-y-2">
          {professionals.map((professional) => (
            <div key={professional.id} className="flex items-center space-x-2">
              <Checkbox id={`professional-${professional.id}`} />
              <label
                htmlFor={`professional-${professional.id}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {professional.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Mostrar</div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="show-projects" defaultChecked />
            <label
              htmlFor="show-projects"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Proyectos
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="show-milestones" defaultChecked />
            <label
              htmlFor="show-milestones"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Hitos
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="show-deadlines" defaultChecked />
            <label
              htmlFor="show-deadlines"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fechas límite
            </label>
          </div>
        </div>
      </div>

      <Button className="w-full">Aplicar Filtros</Button>
    </div>
  )
}


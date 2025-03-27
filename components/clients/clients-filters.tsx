"use client"

import { useState } from "react"
import { ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const sectors = [
  { value: "all", label: "Todos los sectores" },
  { value: "banking", label: "Banca y Finanzas" },
  { value: "insurance", label: "Seguros" },
  { value: "retail", label: "Comercio" },
  { value: "manufacturing", label: "Manufactura" },
  { value: "technology", label: "Tecnología" },
  { value: "healthcare", label: "Salud" },
]

export function ClientsFilters() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar clientes..." className="w-full pl-8" />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between sm:w-[200px]"
          >
            {value ? sectors.find((sector) => sector.value === value)?.label : "Filtrar por sector"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar sector..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {sectors.map((sector) => (
                  <CommandItem
                    key={sector.value}
                    value={sector.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === sector.value ? "opacity-100" : "opacity-0")} />
                    {sector.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}


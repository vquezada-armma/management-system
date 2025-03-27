"use client"

import { useState } from "react"
import { ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const utilizationRanges = [
  { value: "all", label: "Todos los niveles" },
  { value: "low", label: "Baja utilización (<50%)" },
  { value: "medium", label: "Media utilización (50-80%)" },
  { value: "high", label: "Alta utilización (>80%)" },
]

export function ProfessionalsFilters() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar profesionales..." className="w-full pl-8" />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between sm:w-[280px]"
          >
            {value ? utilizationRanges.find((range) => range.value === value)?.label : "Filtrar por utilización"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-0">
          <Command>
            <CommandInput placeholder="Buscar nivel de utilización..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {utilizationRanges.map((range) => (
                  <CommandItem
                    key={range.value}
                    value={range.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === range.value ? "opacity-100" : "opacity-0")} />
                    {range.label}
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


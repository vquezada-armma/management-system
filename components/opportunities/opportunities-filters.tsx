"use client"

import { useState } from "react"
import { ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const stages = [
  { value: "all", label: "Todas las etapas" },
  { value: "lead", label: "Lead" },
  { value: "proposal", label: "Propuesta Enviada" },
  { value: "negotiation", label: "Negociación" },
  { value: "closing", label: "Cierre" },
]

const probabilities = [
  { value: "all", label: "Todas las probabilidades" },
  { value: "low", label: "Baja (<25%)" },
  { value: "medium", label: "Media (25-75%)" },
  { value: "high", label: "Alta (>75%)" },
]

export function OpportunitiesFilters() {
  const [openStage, setOpenStage] = useState(false)
  const [valueStage, setValueStage] = useState("all")
  const [openProbability, setOpenProbability] = useState(false)
  const [valueProbability, setValueProbability] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Buscar oportunidades..." className="w-full pl-8" />
      </div>
      <Popover open={openStage} onOpenChange={setOpenStage}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStage}
            className="w-full justify-between sm:w-[200px]"
          >
            {valueStage ? stages.find((stage) => stage.value === valueStage)?.label : "Filtrar por etapa"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar etapa..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {stages.map((stage) => (
                  <CommandItem
                    key={stage.value}
                    value={stage.value}
                    onSelect={(currentValue) => {
                      setValueStage(currentValue === valueStage ? "" : currentValue)
                      setOpenStage(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", valueStage === stage.value ? "opacity-100" : "opacity-0")} />
                    {stage.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={openProbability} onOpenChange={setOpenProbability}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openProbability}
            className="w-full justify-between sm:w-[240px]"
          >
            {valueProbability
              ? probabilities.find((prob) => prob.value === valueProbability)?.label
              : "Filtrar por probabilidad"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Buscar probabilidad..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {probabilities.map((prob) => (
                  <CommandItem
                    key={prob.value}
                    value={prob.value}
                    onSelect={(currentValue) => {
                      setValueProbability(currentValue === valueProbability ? "" : currentValue)
                      setOpenProbability(false)
                    }}
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", valueProbability === prob.value ? "opacity-100" : "opacity-0")}
                    />
                    {prob.label}
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


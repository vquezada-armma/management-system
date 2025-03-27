"use client"

import { useState } from "react"
import { Download, CalendarIcon, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const timeRanges = [
  { value: "last30", label: "Últimos 30 días" },
  { value: "last90", label: "Últimos 90 días" },
  { value: "lastYear", label: "Último año" },
  { value: "custom", label: "Rango personalizado" },
]

export function ReportsFilters() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("last30")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between sm:w-[200px]"
          >
            {value ? timeRanges.find((timeRange) => timeRange.value === value)?.label : "Seleccionar período"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Buscar período..." />
            <CommandList>
              <CommandEmpty>No se encontraron resultados.</CommandEmpty>
              <CommandGroup>
                {timeRanges.map((timeRange) => (
                  <CommandItem
                    key={timeRange.value}
                    value={timeRange.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === timeRange.value ? "opacity-100" : "opacity-0")} />
                    {timeRange.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="hidden sm:flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Fecha inicio"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
          </PopoverContent>
        </Popover>
        <span>-</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "dd/MM/yyyy") : "Fecha fin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <Button className="ml-auto" variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
    </div>
  )
}

// Helper function for date formatting
function format(date: Date, format: string) {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return format.replace("dd", day).replace("MM", month).replace("yyyy", year)
}


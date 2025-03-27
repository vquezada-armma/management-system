"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
  parseISO,
} from "date-fns"
import { es } from "date-fns/locale"
import { ArrowLeft, ArrowRight, Edit, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import LocalStorageService, { type CalendarEvent } from "@/lib/local-storage-service"

interface CalendarDayProps {
  day: Date
  month: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

function CalendarDay({ day, month, events, onEventClick }: CalendarDayProps) {
  const dayEvents = events
    .filter((event) => {
      if (event.type === "milestone" || event.type === "meeting") {
        return event.date && isSameDay(parseISO(event.date), day)
      } else {
        return event.startDate && event.endDate && day >= parseISO(event.startDate) && day <= parseISO(event.endDate)
      }
    })
    .slice(0, 3)

  const moreEvents =
    events.filter((event) => {
      if (event.type === "milestone" || event.type === "meeting") {
        return event.date && isSameDay(parseISO(event.date), day)
      } else {
        return event.startDate && event.endDate && day >= parseISO(event.startDate) && day <= parseISO(event.endDate)
      }
    }).length > 3

  return (
    <div
      className={cn(
        "h-28 border p-1",
        !isSameMonth(day, month) && "bg-muted/50",
        isSameDay(day, new Date()) && "bg-muted",
      )}
    >
      <div className="flex justify-between">
        <span className={cn("text-sm", !isSameMonth(day, month) && "text-muted-foreground")}>{format(day, "d")}</span>
      </div>
      <div className="mt-1 space-y-1">
        {dayEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className={cn("w-full truncate rounded px-1 py-0.5 text-left text-xs font-medium border", event.color)}
          >
            {event.title}
          </button>
        ))}
        {moreEvents && <div className="text-xs text-muted-foreground">+ más eventos</div>}
      </div>
    </div>
  )
}

export function ProjectsCalendar() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "milestone" as "milestone" | "meeting" | "project",
    date: new Date().toISOString().split("T")[0],
    project: "",
    color: "bg-blue-100 border-blue-300 text-blue-700",
  })

  useEffect(() => {
    async function fetchCalendarEvents() {
      const response = await fetch("/public/data/calendar-events.json") // Ajustar la ruta al archivo JSON
      const data = await response.json()
      setEvents(data)
    }
    fetchCalendarEvents()
  }, [])

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
  }

  const handleAddEvent = () => {
    try {
      const storageService = LocalStorageService.getInstance()
      const savedEvent = storageService.saveCalendarEvent(newEvent)

      setEvents([...events, savedEvent])
      setShowAddEventDialog(false)
      setNewEvent({
        title: "",
        type: "milestone",
        date: new Date().toISOString().split("T")[0],
        project: "",
        color: "bg-blue-100 border-blue-300 text-blue-700",
      })

      toast({
        title: "Evento creado",
        description: "El evento ha sido añadido al calendario",
      })
    } catch (error) {
      console.error("Error al guardar evento:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el evento",
        variant: "destructive",
      })
    }
  }

  // Generate calendar days
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const rows = []
  let days = []
  let day = startDate

  // Create days for the calendar
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(
        <CalendarDay
          key={day.toString()}
          day={new Date(day)}
          month={currentMonth}
          events={events}
          onEventClick={handleEventClick}
        />,
      )
      day = addDays(day, 1)
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7">
        {days}
      </div>,
    )
    days = []
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy", { locale: es })}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowAddEventDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Evento
          </Button>
          <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 bg-muted/50">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="border-b border-l border-r">{rows}</div>

      {selectedEvent && (
        <div className="mt-4 rounded-md border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          {selectedEvent.type === "project" ? (
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Cliente</div>
                <div>{selectedEvent.client}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Fechas</div>
                <div>
                  {selectedEvent.startDate && selectedEvent.endDate && (
                    <span>
                      {format(parseISO(selectedEvent.startDate), "dd/MM/yyyy")} -{" "}
                      {format(parseISO(selectedEvent.endDate), "dd/MM/yyyy")}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Profesionales Asignados</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedEvent.professionals?.map((professional) => (
                    <div key={professional.id} className="flex items-center gap-2 rounded-full bg-muted px-2 py-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={professional.avatar} alt={professional.name} />
                        <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{professional.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Tipo</div>
                <div>
                  <Badge variant="outline">{selectedEvent.type === "milestone" ? "Hito" : "Reunión"}</Badge>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Fecha</div>
                <div>{selectedEvent.date && format(parseISO(selectedEvent.date), "dd/MM/yyyy")}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Proyecto</div>
                <div>{selectedEvent.project}</div>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Evento</DialogTitle>
            <DialogDescription>Crea un nuevo evento en el calendario</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Título del evento"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select
                value={newEvent.type}
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, type: value as "milestone" | "meeting" | "project" })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milestone">Hito</SelectItem>
                  <SelectItem value="meeting">Reunión</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fecha</label>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Proyecto</label>
              <Input
                value={newEvent.project}
                onChange={(e) => setNewEvent({ ...newEvent, project: e.target.value })}
                placeholder="Nombre del proyecto"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg-blue-100 border-blue-300 text-blue-700">Azul</SelectItem>
                  <SelectItem value="bg-green-100 border-green-300 text-green-700">Verde</SelectItem>
                  <SelectItem value="bg-red-100 border-red-300 text-red-700">Rojo</SelectItem>
                  <SelectItem value="bg-amber-100 border-amber-300 text-amber-700">Ámbar</SelectItem>
                  <SelectItem value="bg-purple-100 border-purple-300 text-purple-700">Púrpura</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddEvent}>Guardar Evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}


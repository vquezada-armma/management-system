"use client"

import { useState } from "react"
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
} from "date-fns"
import { es } from "date-fns/locale"
import { ArrowLeft, ArrowRight, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Mock data for the calendar
const events = [
  {
    id: "1",
    title: "Evaluación de riesgos operativos",
    type: "project",
    startDate: new Date(2023, 4, 5),
    endDate: new Date(2023, 5, 20),
    professionals: [
      { id: "1", name: "María González", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Javier López", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    client: "Banco Nacional",
    color: "bg-blue-100 border-blue-300 text-blue-700",
  },
  {
    id: "2",
    title: "Implementación de controles",
    type: "project",
    startDate: new Date(2023, 4, 12),
    endDate: new Date(2023, 5, 25),
    professionals: [
      { id: "2", name: "Carlos Martínez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Javier López", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    client: "Seguros del Sur",
    color: "bg-green-100 border-green-300 text-green-700",
  },
  {
    id: "3",
    title: "Auditoría de cumplimiento",
    type: "project",
    startDate: new Date(2023, 4, 18),
    endDate: new Date(2023, 6, 5),
    professionals: [
      { id: "3", name: "Laura Rodríguez", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Ana Torres", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    client: "Comercial Textil",
    color: "bg-amber-100 border-amber-300 text-amber-700",
  },
  {
    id: "4",
    title: "Entrega Informe Preliminar",
    type: "milestone",
    date: new Date(2023, 4, 25),
    project: "Evaluación de riesgos operativos",
    color: "bg-red-100 border-red-300 text-red-700",
  },
  {
    id: "5",
    title: "Reunión de Revisión",
    type: "milestone",
    date: new Date(2023, 5, 10),
    project: "Implementación de controles",
    color: "bg-purple-100 border-purple-300 text-purple-700",
  },
]

interface CalendarEvent {
  id: string
  title: string
  type: string
  startDate?: Date
  endDate?: Date
  date?: Date
  professionals?: Array<{ id: string; name: string; avatar: string }>
  client?: string
  project?: string
  color: string
}

interface CalendarDayProps {
  day: Date
  month: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

function CalendarDay({ day, month, events, onEventClick }: CalendarDayProps) {
  const dayEvents = events
    .filter((event) => {
      if (event.type === "milestone") {
        return event.date && isSameDay(event.date, day)
      } else {
        return event.startDate && event.endDate && day >= event.startDate && day <= event.endDate
      }
    })
    .slice(0, 3)

  const moreEvents =
    events.filter((event) => {
      if (event.type === "milestone") {
        return event.date && isSameDay(event.date, day)
      } else {
        return event.startDate && event.endDate && day >= event.startDate && day <= event.endDate
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
        {moreEvents && <div className="text-xs text-muted-foreground">+ {events.length - 3} más</div>}
      </div>
    </div>
  )
}

export function ProjectsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
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
          day={day}
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
                      {format(selectedEvent.startDate, "dd/MM/yyyy")} - {format(selectedEvent.endDate, "dd/MM/yyyy")}
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
                <div>Hito</div>
              </div>
              <div>
                <div className="text-sm font-medium">Fecha</div>
                <div>{selectedEvent.date && format(selectedEvent.date, "dd/MM/yyyy")}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Proyecto</div>
                <div>{selectedEvent.project}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


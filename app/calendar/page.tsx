"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ProjectsCalendar } from "@/components/calendar/projects-calendar"
import { CalendarFilters } from "@/components/calendar/calendar-filters"
import { Toaster } from "@/components/ui/toaster"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState([])

  useEffect(() => {
    async function fetchCalendarEvents() {
      const response = await fetch("/public/data/calendar-events.json") // Ajustar la ruta al archivo JSON
      const data = await response.json()
      setEvents(data)
    }
    fetchCalendarEvents()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Calendario de Proyectos</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="w-full" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarFilters />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Proyectos y Asignaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectsCalendar />
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  )
}


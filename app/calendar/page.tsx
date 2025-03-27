"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ProjectsCalendar } from "@/components/calendar/projects-calendar"
import { CalendarFilters } from "@/components/calendar/calendar-filters"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

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
    </div>
  )
}


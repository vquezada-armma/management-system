import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "@/data-chart/pie/1"
import { ChartWrapper } from "@/data-chart/wrapper"

export function ProfessionalReports() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Utilización de Profesionales</CardTitle>
          <CardDescription>Porcentaje de ocupación promedio por profesional</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Utilización de Profesionales" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Especialidades</CardTitle>
          <CardDescription>Profesionales agrupados por especialidad</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Distribución de Especialidades" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos por Profesional</CardTitle>
          <CardDescription>Número de proyectos asignados por profesional</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Proyectos por Profesional" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horas Facturables</CardTitle>
          <CardDescription>Horas facturables por profesional y mes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Horas Facturables" />
        </CardContent>
      </Card>
    </div>
  )
}


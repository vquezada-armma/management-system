import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "@/data-chart/bar/1"
import { ChartWrapper } from "@/data-chart/wrapper"

export function ProjectReports() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Estado de Proyectos</CardTitle>
          <CardDescription>Distribución de proyectos por estado</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Estado de Proyectos" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proyectos por Cliente</CardTitle>
          <CardDescription>Número de proyectos activos por cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Proyectos por Cliente" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cumplimiento de Plazos</CardTitle>
          <CardDescription>Porcentaje de proyectos entregados a tiempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Cumplimiento de Plazos" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tiempo Promedio por Proyecto</CardTitle>
          <CardDescription>Duración promedio de proyectos por tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Tiempo Promedio por Proyecto" />
        </CardContent>
      </Card>
    </div>
  )
}


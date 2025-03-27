import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from "@/data-chart/line/2"
import { ChartWrapper } from "@/data-chart/wrapper"

export function BillingReports() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Facturación por Mes</CardTitle>
          <CardDescription>Tendencia de facturación mensual</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Facturación por Mes" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Facturación por Cliente</CardTitle>
          <CardDescription>Distribución de la facturación por cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Facturación por Cliente" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Facturas</CardTitle>
          <CardDescription>Porcentaje de facturas por estado</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Estado de Facturas" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Días Promedio de Cobro</CardTitle>
          <CardDescription>Tiempo promedio para recibir pagos</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartWrapper content={Chart} className="aspect-[4/3]" title="Días Promedio de Cobro" />
        </CardContent>
      </Card>
    </div>
  )
}


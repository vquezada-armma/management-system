import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function OpportunitiesPipeline() {
  const pipelineData = [
    {
      stage: "Lead",
      count: 5,
      value: 42000,
      color: "bg-gray-500",
    },
    {
      stage: "Propuesta Enviada",
      count: 3,
      value: 35500,
      color: "bg-blue-500",
    },
    {
      stage: "Negociación",
      count: 2,
      value: 28000,
      color: "bg-amber-500",
    },
    {
      stage: "Cierre",
      count: 1,
      value: 15000,
      color: "bg-green-500",
    },
  ]

  const totalCount = pipelineData.reduce((acc, stage) => acc + stage.count, 0)
  const totalValue = pipelineData.reduce((acc, stage) => acc + stage.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de Pipeline</CardTitle>
        <CardDescription>Distribución de oportunidades por etapa y valor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Oportunidades Totales</div>
              <div className="text-2xl font-bold">{totalCount}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Valor Total</div>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            </div>
          </div>

          <div className="h-2 flex rounded-full overflow-hidden">
            {pipelineData.map((stage, index) => (
              <div key={index} className={`${stage.color}`} style={{ width: `${(stage.count / totalCount) * 100}%` }} />
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {pipelineData.map((stage, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${stage.color} mr-2`} />
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <span className="text-sm">{stage.count}</span>
                </div>
                <div className="text-sm text-muted-foreground">${stage.value.toLocaleString()}</div>
                <Progress value={(stage.count / totalCount) * 100} className={`h-1 ${stage.color}`} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


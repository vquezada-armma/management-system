import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ActivityFeed() {
  const activities = [
    {
      id: "1",
      description: "Proyecto 'Evaluación de riesgos' actualizado a 75% de avance",
      timestamp: new Date(2023, 4, 15, 10, 30),
      user: "María González",
    },
    {
      id: "2",
      description: "Nueva oportunidad 'Análisis de vulnerabilidades' registrada",
      timestamp: new Date(2023, 4, 14, 15, 45),
      user: "Carlos Martínez",
    },
    {
      id: "3",
      description: "Factura INV-001 marcada como pagada",
      timestamp: new Date(2023, 4, 13, 9, 20),
      user: "Ana Torres",
    },
    {
      id: "4",
      description: "Javier López asignado al proyecto 'Implementación de controles'",
      timestamp: new Date(2023, 4, 12, 14, 0),
      user: "Laura Rodríguez",
    },
    {
      id: "5",
      description: "Oportunidad 'Plan de continuidad' ha pasado a fase de negociación",
      timestamp: new Date(2023, 4, 11, 11, 15),
      user: "Carlos Martínez",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas actualizaciones en el sistema</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="space-y-1">
            <p className="text-sm">{activity.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{activity.user}</span>
              <span>
                {formatDistanceToNow(activity.timestamp, {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


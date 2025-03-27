import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export function ProfessionalsOverview() {
  const professionals = [
    {
      id: "1",
      name: "María González",
      role: "Consultor Senior",
      utilization: 85,
      projects: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Carlos Martínez",
      role: "Analista de Riesgos",
      utilization: 70,
      projects: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Laura Rodríguez",
      role: "Consultor Junior",
      utilization: 60,
      projects: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      name: "Javier López",
      role: "Consultor Senior",
      utilization: 90,
      projects: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      name: "Ana Torres",
      role: "Analista de Riesgos",
      utilization: 45,
      projects: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profesionales y Utilización</CardTitle>
        <CardDescription>Consultores y su porcentaje de ocupación actual</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {professionals.map((professional) => (
          <div key={professional.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={professional.avatar} alt={professional.name} />
              <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{professional.name}</p>
                <span className="text-sm">{professional.utilization}%</span>
              </div>
              <p className="text-sm text-muted-foreground">{professional.role}</p>
              <Progress
                value={professional.utilization}
                className="h-2"
                color={
                  professional.utilization > 80
                    ? "bg-red-500"
                    : professional.utilization > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
              <p className="text-xs text-muted-foreground">Asignado a {professional.projects} proyectos</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/professionals" className="flex items-center justify-center gap-1">
            Ver todos los profesionales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


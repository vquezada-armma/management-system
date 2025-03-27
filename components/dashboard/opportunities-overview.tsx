import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function OpportunitiesOverview() {
  const opportunities = [
    {
      id: "1",
      name: "Evaluación de riesgos tecnológicos",
      client: "TechSolutions",
      status: "Propuesta enviada",
      probability: "Alta",
      value: "$45,000",
    },
    {
      id: "2",
      name: "Plan de continuidad de negocio",
      client: "Constructora Nacional",
      status: "Negociación",
      probability: "Media",
      value: "$30,000",
    },
    {
      id: "3",
      name: "Análisis de vulnerabilidades",
      client: "Financiera Regional",
      status: "Lead",
      probability: "Baja",
      value: "$18,000",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline de Oportunidades</CardTitle>
        <CardDescription>Oportunidades en seguimiento y proyectos potenciales</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">{opportunity.name}</p>
              <Badge
                variant={
                  opportunity.probability === "Alta"
                    ? "default"
                    : opportunity.probability === "Media"
                      ? "secondary"
                      : "outline"
                }
              >
                {opportunity.probability}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{opportunity.client}</span>
              <span className="text-muted-foreground">{opportunity.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">Estado: {opportunity.status}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/opportunities" className="flex items-center justify-center gap-1">
            Ver todas las oportunidades
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ProjectsOverview() {
  const projects = [
    {
      id: "1",
      name: "Evaluación de riesgos operativos",
      client: "Banco Nacional",
      progress: 75,
      status: "En ejecución",
    },
    {
      id: "2",
      name: "Implementación de controles",
      client: "Seguros del Sur",
      progress: 45,
      status: "En ejecución",
    },
    {
      id: "3",
      name: "Auditoría de cumplimiento",
      client: "Comercial Textil",
      progress: 20,
      status: "En preparación",
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Proyectos en Curso</CardTitle>
        <CardDescription>Resumen de proyectos activos y sus estados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>
              <Badge variant={project.status === "En ejecución" ? "default" : "secondary"}>{project.status}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="h-2" />
              <span className="text-xs text-muted-foreground">{project.progress}%</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/projects" className="flex items-center justify-center gap-1">
            Ver todos los proyectos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


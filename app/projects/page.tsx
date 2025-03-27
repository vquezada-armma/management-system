import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsFilters } from "@/components/projects/projects-filters"

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Proyectos</h1>
        <Button asChild>
          <Link href="/projects/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nuevo Proyecto
          </Link>
        </Button>
      </div>

      <ProjectsFilters />
      <ProjectsList />
    </div>
  )
}


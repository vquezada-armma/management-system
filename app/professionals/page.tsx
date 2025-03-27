import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProfessionalsList } from "@/components/professionals/professionals-list"
import { ProfessionalsFilters } from "@/components/professionals/professionals-filters"

export default function ProfessionalsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Profesionales</h1>
        <Button asChild>
          <Link href="/professionals/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nuevo Profesional
          </Link>
        </Button>
      </div>

      <ProfessionalsFilters />
      <ProfessionalsList />
    </div>
  )
}


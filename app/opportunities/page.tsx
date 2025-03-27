import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OpportunitiesList } from "@/components/opportunities/opportunities-list"
import { OpportunitiesFilters } from "@/components/opportunities/opportunities-filters"
import { OpportunitiesPipeline } from "@/components/opportunities/opportunities-pipeline"

export default function OpportunitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pipeline de Oportunidades</h1>
        <Button asChild>
          <Link href="/opportunities/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nueva Oportunidad
          </Link>
        </Button>
      </div>

      <OpportunitiesPipeline />
      <OpportunitiesFilters />
      <OpportunitiesList />
    </div>
  )
}


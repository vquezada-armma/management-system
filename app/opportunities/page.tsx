"use client"

import { useState } from "react"
import { OpportunitiesList } from "@/components/opportunities/opportunities-list"
import { OpportunitiesFilters } from "@/components/opportunities/opportunities-filters"
import { OpportunitiesPipeline } from "@/components/opportunities/opportunities-pipeline"
import { AddOpportunityForm } from "@/components/opportunities/add-opportunity-form"
import { Toaster } from "@/components/ui/toaster"

export default function OpportunitiesPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleOpportunityAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Pipeline de Oportunidades</h1>
        <AddOpportunityForm onOpportunityAdded={handleOpportunityAdded} />
      </div>

      <OpportunitiesPipeline key={`pipeline-${refreshKey}`} />
      <OpportunitiesFilters />
      <OpportunitiesList key={`list-${refreshKey}`} />
      <Toaster />
    </div>
  )
}


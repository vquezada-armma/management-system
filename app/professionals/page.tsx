"use client"

import { useState } from "react"
import { ProfessionalsList } from "@/components/professionals/professionals-list"
import { ProfessionalsFilters } from "@/components/professionals/professionals-filters"
import { AddProfessionalForm } from "@/components/professionals/add-professional-form"
import { Toaster } from "@/components/ui/toaster"

export default function ProfessionalsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleProfessionalAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Profesionales</h1>
        <AddProfessionalForm onProfessionalAdded={handleProfessionalAdded} />
      </div>

      <ProfessionalsFilters />
      <ProfessionalsList key={refreshKey} />
      <Toaster />
    </div>
  )
}


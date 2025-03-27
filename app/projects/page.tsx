"use client"

import { useState, useEffect } from "react"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsFilters } from "@/components/projects/projects-filters"
import { AddProjectForm } from "@/components/projects/add-project-form"
import { Toaster } from "@/components/ui/toaster"

export default function ProjectsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleProjectAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Proyectos</h1>
        <AddProjectForm onProjectAdded={handleProjectAdded} />
      </div>

      <ProjectsFilters />
      <ProjectsList key={refreshKey} />
      <Toaster />
    </div>
  )
}


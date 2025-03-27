"use client"

import { useState } from "react"
import { ClientsList } from "@/components/clients/clients-list"
import { ClientsFilters } from "@/components/clients/clients-filters"
import { AddClientForm } from "@/components/clients/add-client-form"
import { Toaster } from "@/components/ui/toaster"

export default function ClientsPage() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleClientAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <AddClientForm onClientAdded={handleClientAdded} />
      </div>

      <ClientsFilters />
      <ClientsList key={refreshKey} />
      <Toaster />
    </div>
  )
}


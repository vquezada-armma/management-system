import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientsList } from "@/components/clients/clients-list"
import { ClientsFilters } from "@/components/clients/clients-filters"

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <Button asChild>
          <Link href="/clients/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nuevo Cliente
          </Link>
        </Button>
      </div>

      <ClientsFilters />
      <ClientsList />
    </div>
  )
}


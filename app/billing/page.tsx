import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvoicesList } from "@/components/billing/invoices-list"
import { InvoicesFilters } from "@/components/billing/invoices-filters"
import { BillingSummary } from "@/components/billing/billing-summary"

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Facturación</h1>
        <Button asChild>
          <Link href="/billing/new" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            Nueva Factura
          </Link>
        </Button>
      </div>

      <BillingSummary />
      <InvoicesFilters />
      <InvoicesList />
    </div>
  )
}


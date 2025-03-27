"use client"
import { InvoicesList } from "@/components/billing/invoices-list"
import { InvoicesFilters } from "@/components/billing/invoices-filters"
import { BillingSummary } from "@/components/billing/billing-summary"
import { Toaster } from "@/components/ui/toaster"

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestión de Facturación</h1>
      </div>

      <BillingSummary />
      <InvoicesFilters />
      <InvoicesList />
      <Toaster />
    </div>
  )
}


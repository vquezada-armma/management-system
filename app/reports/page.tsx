import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { ProjectReports } from "@/components/reports/project-reports"
import { BillingReports } from "@/components/reports/billing-reports"
import { ProfessionalReports } from "@/components/reports/professional-reports"
import { Toaster } from "@/components/ui/toaster"

export default function ReportsPage() {
  const [billingData, setBillingData] = useState([])

  useEffect(() => {
    async function fetchBillingData() {
      const response = await fetch("/public/data/billing.json")
      const data = await response.json()
      setBillingData(data)
    }
    fetchBillingData()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Reportes y Análisis</h1>

      <ReportsFilters />

      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="billing">Facturación</TabsTrigger>
          <TabsTrigger value="professionals">Profesionales</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <ProjectReports />
        </TabsContent>
        <TabsContent value="billing">
          <BillingReports data={billingData} />
        </TabsContent>
        <TabsContent value="professionals">
          <ProfessionalReports />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}


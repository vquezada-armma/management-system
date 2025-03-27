import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsFilters } from "@/components/reports/reports-filters"
import { ProjectReports } from "@/components/reports/project-reports"
import { BillingReports } from "@/components/reports/billing-reports"
import { ProfessionalReports } from "@/components/reports/professional-reports"

export default function ReportsPage() {
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
          <BillingReports />
        </TabsContent>
        <TabsContent value="professionals">
          <ProfessionalReports />
        </TabsContent>
      </Tabs>
    </div>
  )
}


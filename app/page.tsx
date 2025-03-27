import { DashboardSummary } from "@/components/dashboard/dashboard-summary"
import { ProjectsOverview } from "@/components/dashboard/projects-overview"
import { OpportunitiesOverview } from "@/components/dashboard/opportunities-overview"
import { BillingOverview } from "@/components/dashboard/billing-overview"
import { ProfessionalsOverview } from "@/components/dashboard/professionals-overview"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Dashboard Ejecutivo</h1>

      <DashboardSummary />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectsOverview />
        <OpportunitiesOverview />
        <BillingOverview />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProfessionalsOverview />
        </div>
        <ActivityFeed />
      </div>
    </div>
  )
}


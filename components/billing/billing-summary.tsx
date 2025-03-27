import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, CircleCheckBig, CircleAlert } from "lucide-react"

export function BillingSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturación Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$58,452</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowUpIcon className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">12.5%</span>
            <span className="ml-1">desde el mes pasado</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturas Pagadas</CardTitle>
          <CircleCheckBig className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$42,850</div>
          <p className="text-xs text-muted-foreground">18 facturas cobradas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturas Pendientes</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$15,602</div>
          <p className="text-xs text-muted-foreground">7 facturas por cobrar</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturas Vencidas</CardTitle>
          <CircleAlert className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$3,850</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <ArrowDownIcon className="mr-1 h-3 w-3 text-red-500" />
            <span className="text-red-500">2 facturas</span>
            <span className="ml-1">vencidas</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


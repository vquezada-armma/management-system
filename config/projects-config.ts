export const projectsData = [
  {
    id: "1",
    name: "Evaluación de riesgos operativos",
    client: "Banco Nacional",
    clientContact: "Juan Pérez",
    startDate: "15/03/2023",
    endDate: "30/06/2023",
    actualEndDate: null, // Nueva columna para fecha real de finalización
    status: "En ejecución",
    progress: 75,
    billingProgress: 50, // Progreso de facturación
    manager: "María González",
    professionals: [
      { id: "1", name: "María González", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    billingPlan: [
      { id: "1", percentage: 50, dueDate: "15/05/2023", status: "Pendiente" },
      { id: "2", percentage: 50, dueDate: "30/06/2023", status: "Pendiente" },
    ],
    documents: [
      { id: "1", name: "Propuesta Firmada", type: "Propuesta", url: "/docs/propuesta.pdf" },
      { id: "2", name: "Contrato Firmado", type: "Contrato", url: "/docs/contrato.pdf" },
    ],
  },
  // ...otros proyectos
]

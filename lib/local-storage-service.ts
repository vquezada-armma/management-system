// Tipos de datos para las entidades principales
export interface Client {
  id: string
  nombre_cliente: string
  nombre_contacto?: string
  correo?: string
  area?: string
  tipo_empresa?: string
  detalle_empresa?: string
  cargo?: string
  nivel_responsabilidad?: string
  createdAt: string
  updatedAt: string
  marca_proyectos: "Sí" | "No"
  numero_proyectos: number
  persona_relacionamiento?: string
  nivel_relacionamiento?: number
}

export interface Professional {
  id: string
  name: string
  role: string
  utilization: number
  projects: Array<{ id: string; name: string }>
  specialty: string
  avatar: string
  email?: string
  phone?: string
  position?: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadDate: string
  size: string
}

export interface Project {
  id: string
  name: string
  client: string
  clientContact: string
  startDate: string
  endDate: string
  status: string
  progress: number
  manager: string
  professionals: Array<{ id: string; name: string; role: string; avatar: string }>
  description?: string
  documents?: Document[]
  relatedOpportunity?: string
}

export interface OpportunityHistoryEntry {
  id: string
  date: string
  action: string
  previousStage?: string
  newStage?: string
  previousValue?: string
  newValue?: string
  previousProbability?: number
  newProbability?: number
  user: string
  notes?: string
}

export interface Opportunity {
  id: string
  name: string
  client: string
  value: string
  estimatedCloseDate: string
  stage: string
  probability: number
  manager: string
  history?: OpportunityHistoryEntry[]
  description?: string
}

export interface CalendarEvent {
  id: string
  title: string
  type: "project" | "milestone" | "meeting"
  startDate?: string
  endDate?: string
  date?: string
  professionals?: Array<{ id: string; name: string; avatar: string }>
  client?: string
  project?: string
  color: string
}

// Datos iniciales (mock)
const initialData = {
  clients: [
    {
      id: "1",
      nombre_cliente: "Banco Nacional",
      nombre_contacto: "Juan Pérez",
      correo: "jperez@banconacional.com",
      area: "Riesgos",
      tipo_empresa: "Banca y Finanzas",
      detalle_empresa: "Entidad bancaria líder en el mercado nacional con múltiples sucursales.",
      cargo: "Gerente de Riesgos",
      nivel_responsabilidad: "Alto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marca_proyectos: "Sí",
      numero_proyectos: 3,
      persona_relacionamiento: "María González",
      nivel_relacionamiento: 8,
    },
    {
      id: "2",
      nombre_cliente: "Seguros del Sur",
      nombre_contacto: "María Rodríguez",
      correo: "mrodriguez@segurosdelsur.com",
      area: "Operaciones",
      tipo_empresa: "Seguros",
      detalle_empresa: "Compañía de seguros especializada en seguros de vida y patrimoniales.",
      cargo: "Directora de Operaciones",
      nivel_responsabilidad: "Alto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marca_proyectos: "Sí",
      numero_proyectos: 2,
      persona_relacionamiento: "Carlos Martínez",
      nivel_relacionamiento: 7,
    },
    {
      id: "3",
      nombre_cliente: "Comercial Textil",
      nombre_contacto: "Carlos Gómez",
      correo: "cgomez@comercialtextil.com",
      area: "Administración",
      tipo_empresa: "Comercio",
      detalle_empresa: "Empresa dedicada a la importación y distribución de productos textiles.",
      cargo: "Gerente Administrativo",
      nivel_responsabilidad: "Medio",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marca_proyectos: "Sí",
      numero_proyectos: 1,
      persona_relacionamiento: "Laura Rodríguez",
      nivel_relacionamiento: 5,
    },
    {
      id: "4",
      nombre_cliente: "Farmacéutica Global",
      nombre_contacto: "Ana Martínez",
      correo: "amartinez@farmaceuticaglobal.com",
      area: "Calidad",
      tipo_empresa: "Salud",
      detalle_empresa: "Laboratorio farmacéutico con presencia internacional.",
      cargo: "Directora de Calidad",
      nivel_responsabilidad: "Alto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marca_proyectos: "Sí",
      numero_proyectos: 1,
      persona_relacionamiento: "Javier López",
      nivel_relacionamiento: 6,
    },
    {
      id: "5",
      nombre_cliente: "Tech Solutions",
      nombre_contacto: "Roberto Sánchez",
      correo: "rsanchez@techsolutions.com",
      area: "Tecnología",
      tipo_empresa: "Tecnología",
      detalle_empresa: "Empresa de desarrollo de software y soluciones tecnológicas.",
      cargo: "CTO",
      nivel_responsabilidad: "Alto",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      marca_proyectos: "Sí",
      numero_proyectos: 2,
      persona_relacionamiento: "Ana Torres",
      nivel_relacionamiento: 9,
    },
  ] as Client[],
  professionals: [
    {
      id: "1",
      name: "María González",
      role: "Consultor Senior",
      utilization: 85,
      projects: [
        { id: "p1", name: "Evaluación de riesgos operativos" },
        { id: "p2", name: "Implementación de controles" },
        { id: "p3", name: "Auditoría de cumplimiento" },
      ],
      specialty: "Riesgos Operativos",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "mgonzalez@riskconsulting.com",
      phone: "+1 (555) 111-2233",
      position: "Consultor Senior de Riesgos Operativos",
    },
    {
      id: "2",
      name: "Carlos Martínez",
      role: "Analista de Riesgos",
      utilization: 70,
      projects: [
        { id: "p2", name: "Implementación de controles" },
        { id: "p4", name: "Plan de continuidad de negocio" },
      ],
      specialty: "Riesgos Tecnológicos",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "cmartinez@riskconsulting.com",
      phone: "+1 (555) 222-3344",
      position: "Analista de Riesgos Tecnológicos",
    },
    {
      id: "3",
      name: "Laura Rodríguez",
      role: "Consultor Junior",
      utilization: 60,
      projects: [
        { id: "p3", name: "Auditoría de cumplimiento" },
        { id: "p5", name: "Análisis de vulnerabilidades" },
      ],
      specialty: "Cumplimiento Regulatorio",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "lrodriguez@riskconsulting.com",
      phone: "+1 (555) 333-4455",
      position: "Consultor Junior de Cumplimiento",
    },
    {
      id: "4",
      name: "Javier López",
      role: "Consultor Senior",
      utilization: 90,
      projects: [
        { id: "p1", name: "Evaluación de riesgos operativos" },
        { id: "p2", name: "Implementación de controles" },
        { id: "p4", name: "Plan de continuidad de negocio" },
        { id: "p5", name: "Análisis de vulnerabilidades" },
      ],
      specialty: "Gestión de Riesgos",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "jlopez@riskconsulting.com",
      phone: "+1 (555) 444-5566",
      position: "Consultor Senior de Gestión de Riesgos",
    },
    {
      id: "5",
      name: "Ana Torres",
      role: "Analista de Riesgos",
      utilization: 45,
      projects: [{ id: "p3", name: "Auditoría de cumplimiento" }],
      specialty: "Riesgos Financieros",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "atorres@riskconsulting.com",
      phone: "+1 (555) 555-6677",
      position: "Analista de Riesgos Financieros",
    },
  ] as Professional[],
  projects: [
    {
      id: "1",
      name: "Evaluación de riesgos operativos",
      client: "Banco Nacional",
      clientContact: "Juan Pérez",
      startDate: "15/03/2023",
      endDate: "30/06/2023",
      status: "En ejecución",
      progress: 75,
      manager: "María González",
      professionals: [
        { id: "1", name: "María González", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      description:
        "Evaluación completa de riesgos operativos para la entidad bancaria, incluyendo análisis de procesos críticos y recomendaciones de mejora.",
      documents: [
        {
          id: "doc1",
          name: "Contrato de Servicios.pdf",
          type: "Contrato",
          url: "#",
          uploadDate: "10/03/2023",
          size: "2.4 MB",
        },
        {
          id: "doc2",
          name: "Propuesta Técnica.pdf",
          type: "Propuesta",
          url: "#",
          uploadDate: "05/03/2023",
          size: "3.1 MB",
        },
      ],
      relatedOpportunity: "1",
    },
    {
      id: "2",
      name: "Implementación de controles",
      client: "Seguros del Sur",
      clientContact: "María Rodríguez",
      startDate: "01/04/2023",
      endDate: "15/07/2023",
      status: "En ejecución",
      progress: 45,
      manager: "Carlos Martínez",
      professionals: [
        {
          id: "2",
          name: "Carlos Martínez",
          role: "Analista de Riesgos",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      description:
        "Implementación de controles de seguridad y cumplimiento para la compañía de seguros, basados en estándares internacionales.",
      documents: [
        {
          id: "doc3",
          name: "Contrato Marco.pdf",
          type: "Contrato",
          url: "#",
          uploadDate: "25/03/2023",
          size: "1.8 MB",
        },
      ],
      relatedOpportunity: "2",
    },
    {
      id: "3",
      name: "Auditoría de cumplimiento",
      client: "Comercial Textil",
      clientContact: "Carlos Gómez",
      startDate: "10/05/2023",
      endDate: "30/07/2023",
      status: "En preparación",
      progress: 20,
      manager: "Laura Rodríguez",
      professionals: [
        { id: "3", name: "Laura Rodríguez", role: "Consultor Junior", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      description:
        "Auditoría de cumplimiento normativo para el sector textil, enfocada en regulaciones laborales y ambientales.",
      documents: [
        {
          id: "doc4",
          name: "Propuesta de Auditoría.pdf",
          type: "Propuesta",
          url: "#",
          uploadDate: "01/05/2023",
          size: "2.2 MB",
        },
      ],
      relatedOpportunity: "3",
    },
    {
      id: "4",
      name: "Plan de continuidad de negocio",
      client: "Farmacéutica Global",
      clientContact: "Ana Martínez",
      startDate: "01/02/2023",
      endDate: "15/04/2023",
      status: "Finalizado",
      progress: 100,
      manager: "Javier López",
      professionals: [
        { id: "4", name: "Javier López", role: "Consultor Senior", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      description:
        "Desarrollo e implementación de un plan de continuidad de negocio para la empresa farmacéutica, incluyendo pruebas y capacitación.",
      documents: [
        {
          id: "doc5",
          name: "Contrato de Servicios.pdf",
          type: "Contrato",
          url: "#",
          uploadDate: "25/01/2023",
          size: "1.9 MB",
        },
        {
          id: "doc6",
          name: "Informe Final.pdf",
          type: "Informe",
          url: "#",
          uploadDate: "12/04/2023",
          size: "4.5 MB",
        },
      ],
      relatedOpportunity: "4",
    },
    {
      id: "5",
      name: "Análisis de vulnerabilidades",
      client: "Tech Solutions",
      clientContact: "Roberto Sánchez",
      startDate: "15/04/2023",
      endDate: "15/06/2023",
      status: "En ejecución",
      progress: 60,
      manager: "Ana Torres",
      professionals: [
        { id: "3", name: "Laura Rodríguez", role: "Consultor Junior", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "5", name: "Ana Torres", role: "Analista de Riesgos", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      description:
        "Análisis de vulnerabilidades de seguridad informática para la empresa tecnológica, incluyendo pruebas de penetración y recomendaciones.",
      documents: [
        {
          id: "doc7",
          name: "Propuesta Técnica.pdf",
          type: "Propuesta",
          url: "#",
          uploadDate: "05/04/2023",
          size: "2.7 MB",
        },
        {
          id: "doc8",
          name: "Acuerdo de Confidencialidad.pdf",
          type: "Contrato",
          url: "#",
          uploadDate: "10/04/2023",
          size: "1.2 MB",
        },
      ],
      relatedOpportunity: "5",
    },
  ] as Project[],
  opportunities: [
    {
      id: "1",
      name: "Evaluación de riesgos tecnológicos",
      client: "TechSolutions",
      value: "$45,000",
      estimatedCloseDate: "30/06/2023",
      stage: "Propuesta Enviada",
      probability: 60,
      manager: "María González",
      description:
        "Evaluación completa de riesgos tecnológicos, incluyendo seguridad de la información y continuidad de TI.",
      history: [
        {
          id: "h1-1",
          date: "15/05/2023",
          action: "Cambio de etapa",
          previousStage: "Lead",
          newStage: "Propuesta Enviada",
          user: "María González",
          notes: "Cliente solicitó propuesta formal después de reunión inicial",
        },
        {
          id: "h1-2",
          date: "10/05/2023",
          action: "Cambio de probabilidad",
          previousProbability: 40,
          newProbability: 60,
          user: "Carlos Martínez",
          notes: "Aumentó interés después de demostración",
        },
      ],
    },
    {
      id: "2",
      name: "Plan de continuidad de negocio",
      client: "Constructora Nacional",
      value: "$30,000",
      estimatedCloseDate: "15/07/2023",
      stage: "Negociación",
      probability: 75,
      manager: "Carlos Martínez",
      description:
        "Desarrollo de un plan de continuidad de negocio para la constructora, incluyendo análisis de impacto y estrategias de recuperación.",
      history: [
        {
          id: "h2-1",
          date: "20/05/2023",
          action: "Cambio de etapa",
          previousStage: "Propuesta Enviada",
          newStage: "Negociación",
          user: "Carlos Martínez",
          notes: "Cliente aceptó propuesta con solicitud de ajustes en alcance",
        },
        {
          id: "h2-2",
          date: "15/05/2023",
          action: "Cambio de valor",
          previousValue: "$25,000",
          newValue: "$30,000",
          user: "Carlos Martínez",
          notes: "Se amplió alcance a solicitud del cliente",
        },
      ],
    },
    {
      id: "3",
      name: "Análisis de vulnerabilidades",
      client: "Financiera Regional",
      value: "$18,000",
      estimatedCloseDate: "10/08/2023",
      stage: "Lead",
      probability: 30,
      manager: "Laura Rodríguez",
      description:
        "Análisis de vulnerabilidades de seguridad para la entidad financiera, incluyendo pruebas de penetración.",
      history: [
        {
          id: "h3-1",
          date: "05/05/2023",
          action: "Creación de oportunidad",
          newStage: "Lead",
          user: "Laura Rodríguez",
          notes: "Contacto inicial en evento de seguridad financiera",
        },
      ],
    },
    {
      id: "4",
      name: "Gestión de riesgos de proyecto",
      client: "Farmacéutica Global",
      value: "$25,000",
      estimatedCloseDate: "20/06/2023",
      stage: "Cierre",
      probability: 90,
      manager: "Javier López",
      description: "Implementación de un sistema de gestión de riesgos para proyectos de investigación y desarrollo.",
      history: [
        {
          id: "h4-1",
          date: "25/05/2023",
          action: "Cambio de etapa",
          previousStage: "Negociación",
          newStage: "Cierre",
          user: "Javier López",
          notes: "Cliente aceptó términos finales, pendiente firma de contrato",
        },
        {
          id: "h4-2",
          date: "20/05/2023",
          action: "Cambio de probabilidad",
          previousProbability: 75,
          newProbability: 90,
          user: "Javier López",
          notes: "Confirmación verbal de aceptación",
        },
      ],
    },
    {
      id: "5",
      name: "Desarrollo de políticas de seguridad",
      client: "Banco Nacional",
      value: "$15,000",
      estimatedCloseDate: "05/07/2023",
      stage: "Propuesta Enviada",
      probability: 55,
      manager: "Ana Torres",
      description: "Desarrollo e implementación de políticas de seguridad de la información para la entidad bancaria.",
      history: [
        {
          id: "h5-1",
          date: "10/05/2023",
          action: "Cambio de etapa",
          previousStage: "Lead",
          newStage: "Propuesta Enviada",
          user: "Ana Torres",
          notes: "Propuesta enviada después de reunión con departamento de seguridad",
        },
      ],
    },
  ] as Opportunity[],
  calendarEvents: [
    {
      id: "1",
      title: "Evaluación de riesgos operativos",
      type: "project",
      startDate: "2023-05-05",
      endDate: "2023-06-20",
      professionals: [
        { id: "1", name: "María González", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "4", name: "Javier López", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      client: "Banco Nacional",
      color: "bg-blue-100 border-blue-300 text-blue-700",
    },
    {
      id: "2",
      title: "Implementación de controles",
      type: "project",
      startDate: "2023-05-12",
      endDate: "2023-06-25",
      professionals: [
        { id: "2", name: "Carlos Martínez", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "4", name: "Javier López", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      client: "Seguros del Sur",
      color: "bg-green-100 border-green-300 text-green-700",
    },
    {
      id: "3",
      title: "Auditoría de cumplimiento",
      type: "project",
      startDate: "2023-05-18",
      endDate: "2023-07-05",
      professionals: [
        { id: "3", name: "Laura Rodríguez", avatar: "/placeholder.svg?height=32&width=32" },
        { id: "5", name: "Ana Torres", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      client: "Comercial Textil",
      color: "bg-amber-100 border-amber-300 text-amber-700",
    },
    {
      id: "4",
      title: "Entrega Informe Preliminar",
      type: "milestone",
      date: "2023-05-25",
      project: "Evaluación de riesgos operativos",
      color: "bg-red-100 border-red-300 text-red-700",
    },
    {
      id: "5",
      title: "Reunión de Revisión",
      type: "milestone",
      date: "2023-06-10",
      project: "Implementación de controles",
      color: "bg-purple-100 border-purple-300 text-purple-700",
    },
    {
      id: "6",
      title: "Reunión con Cliente",
      type: "meeting",
      date: "2023-05-30",
      project: "Auditoría de cumplimiento",
      professionals: [{ id: "3", name: "Laura Rodríguez", avatar: "/placeholder.svg?height=32&width=32" }],
      color: "bg-indigo-100 border-indigo-300 text-indigo-700",
    },
  ] as CalendarEvent[],
}

// Clase para manejar el almacenamiento local
class LocalStorageService {
  private static instance: LocalStorageService
  private storageKey = "risk-management-system"

  private constructor() {
    // Inicializar el almacenamiento si no existe
    if (typeof window !== "undefined" && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialData))
    }
  }

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService()
    }
    return LocalStorageService.instance
  }

  // Métodos genéricos para CRUD
  private getData<T>(entity: string): T[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(this.storageKey)
    if (!data) return []
    return JSON.parse(data)[entity] || []
  }

  private saveData<T>(entity: string, data: T[]): void {
    if (typeof window === "undefined") return
    const currentData = JSON.parse(localStorage.getItem(this.storageKey) || "{}")
    currentData[entity] = data
    localStorage.setItem(this.storageKey, JSON.stringify(currentData))
  }

  // Métodos específicos para cada entidad
  public getClients(): Client[] {
    return this.getData<Client>("clients")
  }

  public saveClient(client: Client): Client {
    const clients = this.getClients()
    const now = new Date().toISOString()
    const newClient = {
      ...client,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      numero_proyectos: client.marca_proyectos === "Sí" ? Math.max(1, client.numero_proyectos || 1) : 0,
    }
    clients.push(newClient)
    this.saveData("clients", clients)
    return newClient
  }

  public updateClient(client: Client): Client {
    const clients = this.getClients()
    const index = clients.findIndex((c) => c.id === client.id)
    if (index !== -1) {
      const updatedClient = {
        ...client,
        updatedAt: new Date().toISOString(),
        numero_proyectos: client.marca_proyectos === "Sí" ? Math.max(1, client.numero_proyectos || 1) : 0,
      }
      clients[index] = updatedClient
      this.saveData("clients", clients)
      return updatedClient
    }
    return client
  }

  public getProfessionals(): Professional[] {
    return this.getData<Professional>("professionals")
  }

  public saveProfessional(professional: Professional): Professional {
    const professionals = this.getProfessionals()
    const newProfessional = { ...professional, id: this.generateId() }
    professionals.push(newProfessional)
    this.saveData("professionals", professionals)
    return newProfessional
  }

  public updateProfessional(professional: Professional): Professional {
    const professionals = this.getProfessionals()
    const index = professionals.findIndex((p) => p.id === professional.id)
    if (index !== -1) {
      professionals[index] = professional
      this.saveData("professionals", professionals)
    }
    return professional
  }

  public getProjects(): Project[] {
    return this.getData<Project>("projects")
  }

  public saveProject(project: Project): Project {
    const projects = this.getProjects()
    const newProject = { ...project, id: this.generateId() }
    projects.push(newProject)
    this.saveData("projects", projects)

    // Actualizar el número de proyectos del cliente
    this.updateClientProjectCount(project.client, 1)

    return newProject
  }

  public updateProject(project: Project): Project {
    const projects = this.getProjects()
    const index = projects.findIndex((p) => p.id === project.id)
    if (index !== -1) {
      projects[index] = project
      this.saveData("projects", projects)
    }
    return project
  }

  public getOpportunities(): Opportunity[] {
    return this.getData<Opportunity>("opportunities")
  }

  public saveOpportunity(opportunity: Opportunity): Opportunity {
    const opportunities = this.getOpportunities()
    const newOpportunity = {
      ...opportunity,
      id: this.generateId(),
      history: opportunity.history || [
        {
          id: this.generateId(),
          date: new Date().toISOString().split("T")[0],
          action: "Creación de oportunidad",
          newStage: opportunity.stage,
          user: opportunity.manager,
          notes: "Oportunidad creada",
        },
      ],
    }
    opportunities.push(newOpportunity)
    this.saveData("opportunities", opportunities)
    return newOpportunity
  }

  public updateOpportunity(opportunity: Opportunity, historyEntry?: OpportunityHistoryEntry): Opportunity {
    const opportunities = this.getOpportunities()
    const index = opportunities.findIndex((o) => o.id === opportunity.id)
    if (index !== -1) {
      // Si hay una entrada de historial, añadirla
      if (historyEntry) {
        opportunity.history = [
          ...(opportunity.history || []),
          {
            ...historyEntry,
            id: this.generateId(),
            date: new Date().toISOString().split("T")[0],
          },
        ]
      }
      opportunities[index] = opportunity
      this.saveData("opportunities", opportunities)
    }
    return opportunity
  }

  public getCalendarEvents(): CalendarEvent[] {
    return this.getData<CalendarEvent>("calendarEvents")
  }

  public saveCalendarEvent(event: CalendarEvent): CalendarEvent {
    const events = this.getCalendarEvents()
    const newEvent = { ...event, id: this.generateId() }
    events.push(newEvent)
    this.saveData("calendarEvents", events)
    return newEvent
  }

  public updateCalendarEvent(event: CalendarEvent): CalendarEvent {
    const events = this.getCalendarEvents()
    const index = events.findIndex((e) => e.id === event.id)
    if (index !== -1) {
      events[index] = event
      this.saveData("calendarEvents", events)
    }
    return event
  }

  // Método para actualizar el contador de proyectos de un cliente
  private updateClientProjectCount(clientName: string, increment: number): void {
    const clients = this.getClients()
    const clientIndex = clients.findIndex((c) => c.nombre_cliente === clientName)

    if (clientIndex !== -1) {
      const client = clients[clientIndex]
      const updatedClient = {
        ...client,
        numero_proyectos: client.numero_proyectos + increment,
        marca_proyectos: client.numero_proyectos + increment > 0 ? "Sí" : "No",
        updatedAt: new Date().toISOString(),
      }

      clients[clientIndex] = updatedClient
      this.saveData("clients", clients)
    }
  }

  // Utilidades
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

export default LocalStorageService


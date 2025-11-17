# AI Agents Studio - Architecture Diagrams

This document contains visual representations of the system architecture using Mermaid diagrams.

---

## System Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] -->|HTTPS| B[Next.js App]
    end

    subgraph "Application Layer"
        B -->|Server Components| C[Dashboard Pages]
        B -->|Client Components| D[Interactive UI]
        B -->|API Routes| E[REST API]
    end

    subgraph "Data Layer"
        E -->|SQL Queries| F[Supabase PostgreSQL]
        E -->|Auth| G[Supabase Auth]
        E -->|Files| H[Supabase Storage]
    end

    subgraph "Integration Layer"
        E -->|Webhooks| I[n8n Workflows]
        E -->|REST API| J[Flowise Chatflows]
        E -->|HTTP| K[Gotenberg PDF]
    end

    subgraph "Infrastructure"
        L[Traefik Reverse Proxy] -->|SSL/TLS| B
        L -->|SSL/TLS| I
        L -->|SSL/TLS| J
        L -->|SSL/TLS| K
    end

    style B fill:#10b981
    style E fill:#10b981
    style F fill:#3ecf8e
    style L fill:#1f4d2f
```

---

## Data Model

```mermaid
erDiagram
    agentsapp_users ||--o{ agentsapp_agents : owns
    agentsapp_agents ||--o{ agentsapp_executions : executes
    agentsapp_templates ||--o{ agentsapp_agents : instantiates

    agentsapp_users {
        uuid id PK
        text display_name
        text avatar_url
        text api_key UK
        jsonb preferences
        timestamptz created_at
        timestamptz updated_at
    }

    agentsapp_agents {
        uuid id PK
        uuid user_id FK
        text name
        text description
        text type
        jsonb config
        text status
        timestamptz created_at
        timestamptz updated_at
    }

    agentsapp_executions {
        uuid id PK
        uuid agent_id FK
        uuid user_id FK
        jsonb input_data
        jsonb output_data
        text status
        text trigger_type
        int duration_ms
        text error_message
        timestamptz started_at
        timestamptz completed_at
        timestamptz created_at
    }

    agentsapp_templates {
        uuid id PK
        text name
        text description
        text category
        jsonb config
        text[] tags
        boolean is_public
        timestamptz created_at
        timestamptz updated_at
    }
```

---

## Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant N as Next.js App
    participant M as Middleware
    participant S as Supabase Auth

    U->>B: Navigate to /login
    B->>N: GET /login
    N->>B: Render Login Page
    U->>B: Enter Email
    B->>N: POST auth/signInWithOtp
    N->>S: Create Magic Link
    S->>U: Send Email
    U->>S: Click Magic Link
    S->>N: GET /auth/callback?code=...
    N->>S: Exchange Code for Session
    S->>N: Return Session
    N->>B: Set Cookies
    N->>B: Redirect to /dashboard
    B->>N: GET /dashboard
    N->>M: Check Auth
    M->>S: Validate Session
    S->>M: Session Valid
    M->>N: Allow Request
    N->>B: Render Dashboard
```

---

## Agent Execution Flow

```mermaid
sequenceDiagram
    participant U as User
    participant API as API Route
    participant DB as Supabase
    participant E as Execution Engine
    participant I as Integration (n8n/Flowise)

    U->>API: POST /api/agents/[id]/execute
    API->>DB: Verify Agent Exists
    DB->>API: Agent Data
    API->>DB: Create Execution Record (status: pending)
    DB->>API: Execution ID
    API->>U: Return Execution ID (201)
    API->>E: Trigger Async Execution

    Note over E: Execution runs asynchronously

    E->>DB: Update Status (running)
    E->>I: Call Integration API
    I->>E: Return Result
    E->>DB: Update Status (success/failed)
    E->>DB: Store Output Data
    E->>DB: Record Duration

    U->>API: GET /api/executions/[id]
    API->>DB: Fetch Execution
    DB->>API: Execution Data
    API->>U: Return Execution Status
```

---

## API Request/Response Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant R as API Route
    participant M as Middleware
    participant V as Validator (Zod)
    participant DB as Database
    participant E as Error Handler

    C->>R: HTTP Request
    R->>M: Check Auth
    alt Not Authenticated
        M->>E: Throw Unauthorized
        E->>C: 401 Unauthorized
    else Authenticated
        M->>R: User Context
        R->>V: Validate Input
        alt Validation Fails
            V->>E: Validation Error
            E->>C: 400 Bad Request
        else Validation Succeeds
            V->>R: Validated Data
            R->>DB: Query Database
            alt Database Error
                DB->>E: Error
                E->>C: 500 Internal Error
            else Success
                DB->>R: Result
                R->>C: 200 OK + Data
            end
        end
    end
```

---

## Component Hierarchy

```mermaid
graph TD
    A[RootLayout] --> B[DashboardLayout]
    B --> C[Navbar]
    B --> D[Sidebar]
    B --> E[Main Content]

    E --> F[Dashboard Page]
    E --> G[Agents Pages]
    E --> H[Templates Page]
    E --> I[Executions Pages]
    E --> J[Settings Page]

    G --> K[AgentList]
    G --> L[AgentDetail]
    G --> M[NewAgent]

    L --> N[AgentEditor]
    L --> O[RecentExecutions]

    H --> P[TemplateGrid]
    H --> Q[TemplateFilters]

    I --> R[ExecutionList]
    I --> S[ExecutionDetail]

    J --> T[ProfileSettings]
    J --> U[ApiKeySettings]
    J --> V[IntegrationSettings]

    style A fill:#1f4d2f
    style B fill:#10b981
    style E fill:#3ecf8e
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "VPS: srv867044.hstgr.cloud"
        A[Traefik Reverse Proxy]

        subgraph "Services"
            B[AI Agents Studio:3000]
            C[n8n]
            D[Flowise]
            E[Gotenberg]
            F[Supabase]
        end
    end

    A -->|agents.smartcamp.ai| B
    A -->|n8n.smartcamp.ai| C
    A -->|flowise.smartcamp.ai| D
    A -->|gotenberg.smartcamp.ai| E
    A -->|api.supabase.smartcamp.ai| F

    B --> G[(PostgreSQL)]
    F --> G

    H[Internet] -->|HTTPS| A
    A -->|Let's Encrypt| I[SSL Certificates]

    style A fill:#1f4d2f
    style B fill:#10b981
    style G fill:#3ecf8e
```

---

## Integration Flow

```mermaid
graph LR
    subgraph "AI Agents Studio"
        A[Agent Config]
    end

    subgraph "n8n Integration"
        B[n8n Webhook] -->|Executes| C[n8n Workflow]
        C -->|Returns| D[Workflow Result]
    end

    subgraph "Flowise Integration"
        E[Flowise API] -->|Chat| F[Chatflow]
        F -->|Returns| G[AI Response]
    end

    subgraph "Gotenberg Integration"
        H[Gotenberg API] -->|Convert| I[HTML/URL to PDF]
        I -->|Returns| J[PDF File]
    end

    A -->|Webhook URL| B
    A -->|Chatflow ID| E
    A -->|HTML/URL| H

    D -->|Result| K[Execution Output]
    G -->|Response| K
    J -->|PDF| K

    style A fill:#10b981
    style C fill:#FF6D5A
    style F fill:#3b82f6
    style I fill:#e74c3c
```

---

## State Management

```mermaid
stateDiagram-v2
    [*] --> Draft: Create Agent
    Draft --> Active: Activate
    Draft --> Archived: Archive
    Active --> Paused: Pause
    Active --> Archived: Archive
    Paused --> Active: Resume
    Paused --> Archived: Archive
    Archived --> [*]

    note right of Draft
        Initial state after creation
        Can be edited freely
    end note

    note right of Active
        Agent is live and can be executed
        Appears in public listings
    end note

    note right of Paused
        Temporarily disabled
        Can be resumed quickly
    end note

    note right of Archived
        Permanently disabled
        Historical record only
    end note
```

---

## Execution State Machine

```mermaid
stateDiagram-v2
    [*] --> Pending: Create Execution
    Pending --> Running: Start Execution
    Running --> Success: Completed Successfully
    Running --> Failed: Error Occurred
    Running --> Timeout: Exceeded Timeout
    Success --> [*]
    Failed --> [*]
    Timeout --> [*]

    note right of Pending
        Execution queued
        Waiting to start
    end note

    note right of Running
        Agent is executing
        Processing input
    end note

    note right of Success
        Execution completed
        Output data available
    end note

    note right of Failed
        Execution failed
        Error message recorded
    end note

    note right of Timeout
        Exceeded max duration
        Partial output may exist
    end note
```

---

## Technology Stack Diagram

```mermaid
graph TB
    subgraph "Frontend"
        A[React 18] --> B[Next.js 14]
        B --> C[TypeScript 5.6]
        C --> D[Tailwind CSS 3.4]
    end

    subgraph "Backend"
        E[Next.js API Routes] --> F[Supabase Client]
        F --> G[PostgreSQL 15]
    end

    subgraph "State & Data"
        H[React Context] --> I[Zustand]
        J[Zod Validation] --> K[React Hook Form]
    end

    subgraph "Testing"
        L[Jest] --> M[React Testing Library]
        N[Supertest] --> O[MSW]
    end

    subgraph "Deployment"
        P[Docker] --> Q[Traefik]
        Q --> R[Let's Encrypt SSL]
    end

    B --> E
    I --> B
    K --> B
    M --> B
    P --> B

    style B fill:#10b981
    style G fill:#3ecf8e
    style Q fill:#1f4d2f
```

---

_These diagrams provide a visual overview of the AI Agents Studio architecture. They are generated using Mermaid and can be viewed in any Markdown renderer that supports Mermaid syntax._

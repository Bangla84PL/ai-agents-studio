# AI Agents Studio - API Documentation

**Version:** 0.1.0
**Base URL:** `https://agents.smartcamp.ai/api`
**Authentication:** JWT Bearer Token (from Supabase Auth)

---

## Authentication

All API endpoints require authentication via Supabase JWT token:

```
Authorization: Bearer <jwt_token>
```

Get token via Supabase Auth (magic link or OAuth).

---

## Endpoints

### Agents

#### List Agents
```
GET /api/agents
```

Query Parameters:
- `status` (optional): Filter by status (draft, active, paused, archived)
- `type` (optional): Filter by type (chat, workflow, hybrid)
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Results per page (default: 20, max: 100)

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "name": "My Agent",
      "description": "Agent description",
      "type": "chat",
      "config": {},
      "status": "active",
      "created_at": "2025-11-17T00:00:00Z",
      "updated_at": "2025-11-17T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 42,
    "totalPages": 3
  }
}
```

#### Create Agent
```
POST /api/agents
```

Request Body:
```json
{
  "name": "My Agent",
  "description": "Optional description",
  "type": "chat",
  "config": {},
  "status": "draft"
}
```

#### Get Agent
```
GET /api/agents/{id}
```

#### Update Agent
```
PUT /api/agents/{id}
```

#### Delete Agent
```
DELETE /api/agents/{id}
```

#### Execute Agent
```
POST /api/agents/{id}/execute
```

Request Body:
```json
{
  "input_data": {
    "message": "Hello, agent!"
  }
}
```

Response:
```json
{
  "execution_id": "uuid",
  "status": "running"
}
```

---

### Templates

#### List Templates
```
GET /api/templates
```

#### Get Template
```
GET /api/templates/{id}
```

---

### Executions

#### List Executions
```
GET /api/executions
```

#### Get Execution
```
GET /api/executions/{id}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limits

- **Read Operations:** 60 requests/minute
- **Write Operations:** 20 requests/minute
- **Agent Executions:** 5 requests/minute

*(Note: Rate limiting to be implemented in Phase 2)*

---

## Error Response Format

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

---

For detailed implementation, see source code in `app/api/`.

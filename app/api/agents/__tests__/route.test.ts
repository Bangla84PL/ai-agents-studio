/**
 * Integration tests for /api/agents endpoints
 */

import { NextRequest } from 'next/server'
import { GET, POST } from '../route'

// Mock Supabase
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}))

// Mock validation
jest.mock('@/lib/validators/agent', () => ({
  createAgentSchema: {
    safeParse: jest.fn(),
  },
}))

import { createClient } from '@/lib/supabase/server'
import { createAgentSchema } from '@/lib/validators/agent'

describe('GET /api/agents', () => {
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      range: jest.fn().mockReturnThis(),
    }
    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: new Error('Not authenticated'),
    })

    const request = new NextRequest('http://localhost:3000/api/agents')
    const response = await GET(request)

    expect(response.status).toBe(401)
    const body = await response.json()
    expect(body.error.message).toBe('Unauthorized')
  })

  it('should return agents list with pagination', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }
    const mockAgents = [
      { id: '1', name: 'Agent 1', type: 'chat', status: 'active' },
      { id: '2', name: 'Agent 2', type: 'workflow', status: 'draft' },
    ]

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: mockAgents,
      error: null,
      count: 2,
    })

    const request = new NextRequest('http://localhost:3000/api/agents')
    const response = await GET(request)

    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body.data).toEqual(mockAgents)
    expect(body.pagination).toEqual({
      page: 1,
      pageSize: 20,
      totalCount: 2,
      totalPages: 1,
    })
  })

  it('should filter by status', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: [],
      error: null,
      count: 0,
    })

    const request = new NextRequest('http://localhost:3000/api/agents?status=active')
    await GET(request)

    expect(mockSupabase.eq).toHaveBeenCalledWith('status', 'active')
  })

  it('should filter by type', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: [],
      error: null,
      count: 0,
    })

    const request = new NextRequest('http://localhost:3000/api/agents?type=chat')
    await GET(request)

    expect(mockSupabase.eq).toHaveBeenCalledWith('type', 'chat')
  })

  it('should handle pagination parameters', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: [],
      error: null,
      count: 100,
    })

    const request = new NextRequest('http://localhost:3000/api/agents?page=2&pageSize=10')
    const response = await GET(request)

    expect(mockSupabase.range).toHaveBeenCalledWith(10, 19)

    const body = await response.json()
    expect(body.pagination.page).toBe(2)
    expect(body.pagination.pageSize).toBe(10)
  })

  it('should limit pageSize to 100', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: [],
      error: null,
      count: 0,
    })

    const request = new NextRequest('http://localhost:3000/api/agents?pageSize=200')
    const response = await GET(request)

    const body = await response.json()
    expect(body.pagination.pageSize).toBe(100)
  })

  it('should handle database errors', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    mockSupabase.range.mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    })

    const request = new NextRequest('http://localhost:3000/api/agents')
    const response = await GET(request)

    expect(response.status).toBe(500)
    const body = await response.json()
    expect(body.error.message).toBe('Failed to fetch agents')
  })
})

describe('POST /api/agents', () => {
  let mockSupabase: any

  beforeEach(() => {
    mockSupabase = {
      auth: {
        getUser: jest.fn(),
      },
      from: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
    }
    ;(createClient as jest.Mock).mockResolvedValue(mockSupabase)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create agent successfully', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }
    const mockAgentData = {
      name: 'New Agent',
      description: 'Test agent',
      type: 'chat',
      config: {},
      status: 'draft',
    }
    const mockCreatedAgent = {
      id: 'agent-456',
      user_id: 'user-123',
      ...mockAgentData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    ;(createAgentSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockAgentData,
    })

    mockSupabase.single.mockResolvedValue({
      data: mockCreatedAgent,
      error: null,
    })

    const request = new NextRequest('http://localhost:3000/api/agents', {
      method: 'POST',
      body: JSON.stringify(mockAgentData),
    })

    const response = await POST(request)

    expect(response.status).toBe(201)
    const body = await response.json()
    expect(body.data).toEqual(mockCreatedAgent)
  })

  it('should return 401 if not authenticated', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: null },
      error: new Error('Not authenticated'),
    })

    const request = new NextRequest('http://localhost:3000/api/agents', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(401)
  })

  it('should return 400 for validation errors', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    ;(createAgentSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
      error: {
        format: () => ({
          name: { _errors: ['Name is required'] },
        }),
      },
    })

    const request = new NextRequest('http://localhost:3000/api/agents', {
      method: 'POST',
      body: JSON.stringify({ name: '' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(400)
    const body = await response.json()
    expect(body.error.message).toBe('Validation failed')
  })

  it('should handle database errors', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    ;(createAgentSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: { name: 'Test', type: 'chat' },
    })

    mockSupabase.single.mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    })

    const request = new NextRequest('http://localhost:3000/api/agents', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test', type: 'chat' }),
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
  })

  it('should include user_id in insert', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' }
    const mockAgentData = {
      name: 'Test Agent',
      type: 'chat',
    }

    mockSupabase.auth.getUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    })

    ;(createAgentSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: { ...mockAgentData, config: {}, status: 'draft' },
    })

    mockSupabase.single.mockResolvedValue({
      data: {},
      error: null,
    })

    const request = new NextRequest('http://localhost:3000/api/agents', {
      method: 'POST',
      body: JSON.stringify(mockAgentData),
    })

    await POST(request)

    expect(mockSupabase.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-123',
      })
    )
  })
})

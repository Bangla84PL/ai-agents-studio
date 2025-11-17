-- AI Agents Studio - Initial Database Schema
-- Namespace: agentsapp_*
-- All tables, buckets, and functions use the agentsapp_ prefix to avoid conflicts

-- ============================================================================
-- Enable necessary extensions
-- ============================================================================

-- UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- Table: agentsapp_users
-- Extended user profile beyond auth.users
-- ============================================================================

CREATE TABLE IF NOT EXISTS agentsapp_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  api_key TEXT UNIQUE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_agentsapp_users_api_key ON agentsapp_users(api_key) WHERE api_key IS NOT NULL;

-- RLS Policies
ALTER TABLE agentsapp_users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON agentsapp_users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON agentsapp_users
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON agentsapp_users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- Table: agentsapp_agents
-- Agent definitions and configurations
-- ============================================================================

CREATE TABLE IF NOT EXISTS agentsapp_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES agentsapp_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('chat', 'workflow', 'hybrid')),
  config JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT agentsapp_agents_name_not_empty CHECK (LENGTH(name) > 0),
  CONSTRAINT agentsapp_agents_name_max_length CHECK (LENGTH(name) <= 100)
);

-- Indexes
CREATE INDEX idx_agentsapp_agents_user_id ON agentsapp_agents(user_id);
CREATE INDEX idx_agentsapp_agents_status ON agentsapp_agents(status);
CREATE INDEX idx_agentsapp_agents_type ON agentsapp_agents(type);
CREATE INDEX idx_agentsapp_agents_created_at ON agentsapp_agents(created_at DESC);

-- RLS Policies
ALTER TABLE agentsapp_agents ENABLE ROW LEVEL SECURITY;

-- Users can read their own agents
CREATE POLICY "Users can read own agents"
  ON agentsapp_agents
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own agents
CREATE POLICY "Users can insert own agents"
  ON agentsapp_agents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own agents
CREATE POLICY "Users can update own agents"
  ON agentsapp_agents
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own agents
CREATE POLICY "Users can delete own agents"
  ON agentsapp_agents
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- Table: agentsapp_executions
-- Agent execution history and logs
-- ============================================================================

CREATE TABLE IF NOT EXISTS agentsapp_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agentsapp_agents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES agentsapp_users(id) ON DELETE CASCADE,
  input_data JSONB,
  output_data JSONB,
  status TEXT NOT NULL CHECK (status IN ('pending', 'running', 'success', 'failed', 'timeout')),
  duration_ms INTEGER,
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT agentsapp_executions_duration_positive CHECK (duration_ms IS NULL OR duration_ms >= 0),
  CONSTRAINT agentsapp_executions_completed_after_started CHECK (completed_at IS NULL OR completed_at >= started_at)
);

-- Indexes
CREATE INDEX idx_agentsapp_executions_agent_id ON agentsapp_executions(agent_id);
CREATE INDEX idx_agentsapp_executions_user_id ON agentsapp_executions(user_id);
CREATE INDEX idx_agentsapp_executions_status ON agentsapp_executions(status);
CREATE INDEX idx_agentsapp_executions_started_at ON agentsapp_executions(started_at DESC);

-- RLS Policies
ALTER TABLE agentsapp_executions ENABLE ROW LEVEL SECURITY;

-- Users can read their own executions
CREATE POLICY "Users can read own executions"
  ON agentsapp_executions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own executions
CREATE POLICY "Users can insert own executions"
  ON agentsapp_executions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own executions (for status updates)
CREATE POLICY "Users can update own executions"
  ON agentsapp_executions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- Table: agentsapp_templates
-- Pre-built agent templates
-- ============================================================================

CREATE TABLE IF NOT EXISTS agentsapp_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('chat', 'workflow', 'hybrid', 'utility')),
  config JSONB NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT agentsapp_templates_name_not_empty CHECK (LENGTH(name) > 0),
  CONSTRAINT agentsapp_templates_name_max_length CHECK (LENGTH(name) <= 100)
);

-- Indexes
CREATE INDEX idx_agentsapp_templates_category ON agentsapp_templates(category);
CREATE INDEX idx_agentsapp_templates_tags ON agentsapp_templates USING GIN(tags);
CREATE INDEX idx_agentsapp_templates_is_public ON agentsapp_templates(is_public);

-- RLS Policies
ALTER TABLE agentsapp_templates ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read public templates
CREATE POLICY "Authenticated users can read public templates"
  ON agentsapp_templates
  FOR SELECT
  USING (auth.role() = 'authenticated' AND is_public = TRUE);

-- ============================================================================
-- Functions
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION agentsapp_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER agentsapp_users_updated_at
  BEFORE UPDATE ON agentsapp_users
  FOR EACH ROW
  EXECUTE FUNCTION agentsapp_update_updated_at();

CREATE TRIGGER agentsapp_agents_updated_at
  BEFORE UPDATE ON agentsapp_agents
  FOR EACH ROW
  EXECUTE FUNCTION agentsapp_update_updated_at();

CREATE TRIGGER agentsapp_templates_updated_at
  BEFORE UPDATE ON agentsapp_templates
  FOR EACH ROW
  EXECUTE FUNCTION agentsapp_update_updated_at();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION agentsapp_handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO agentsapp_users (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION agentsapp_handle_new_user();

-- ============================================================================
-- Storage Buckets
-- ============================================================================

-- Note: Storage buckets are created via Supabase Dashboard or API
-- These are documented here for reference

-- Bucket: agentsapp-uploads
-- Purpose: User-uploaded files (agent inputs, test data)
-- Policy: Users can upload to their own folder ({user_id}/*)
-- Max file size: 10MB

-- Bucket: agentsapp-agent-assets
-- Purpose: Agent-specific assets (icons, images, documents)
-- Policy: Users can upload to their agents' folders ({user_id}/{agent_id}/*)
-- Max file size: 5MB

-- ============================================================================
-- Seed Data: Initial Templates
-- ============================================================================

INSERT INTO agentsapp_templates (name, description, category, config, tags) VALUES
(
  'Simple Chat Agent',
  'A basic chat agent that responds to user messages using AI',
  'chat',
  '{"type": "chat", "model": "gpt-3.5-turbo", "systemPrompt": "You are a helpful assistant."}'::jsonb,
  ARRAY['chat', 'beginner', 'ai']
),
(
  'Data Processor',
  'Process and transform data using custom logic',
  'workflow',
  '{"type": "workflow", "steps": [{"type": "input"}, {"type": "process"}, {"type": "output"}]}'::jsonb,
  ARRAY['workflow', 'data', 'processing']
),
(
  'Customer Support Bot',
  'AI-powered customer support assistant with FAQs',
  'chat',
  '{"type": "chat", "model": "gpt-4", "systemPrompt": "You are a friendly customer support agent. Help customers with their questions.", "faq": true}'::jsonb,
  ARRAY['chat', 'support', 'customer-service']
),
(
  'n8n Workflow Trigger',
  'Trigger n8n workflows based on conditions',
  'hybrid',
  '{"type": "hybrid", "n8n": {"webhookUrl": "", "enabled": true}, "conditions": []}'::jsonb,
  ARRAY['n8n', 'automation', 'workflow']
),
(
  'Flowise Chatflow',
  'Connect to Flowise AI chatflows',
  'hybrid',
  '{"type": "hybrid", "flowise": {"chatflowId": "", "enabled": true}}'::jsonb,
  ARRAY['flowise', 'ai', 'chatflow']
);

-- ============================================================================
-- Grants
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO authenticated;

-- Grant permissions on tables
GRANT ALL ON agentsapp_users TO authenticated;
GRANT ALL ON agentsapp_agents TO authenticated;
GRANT ALL ON agentsapp_executions TO authenticated;
GRANT SELECT ON agentsapp_templates TO authenticated;

-- ============================================================================
-- Comments
-- ============================================================================

COMMENT ON TABLE agentsapp_users IS 'Extended user profiles for AI Agents Studio';
COMMENT ON TABLE agentsapp_agents IS 'Agent definitions and configurations';
COMMENT ON TABLE agentsapp_executions IS 'Agent execution history and logs';
COMMENT ON TABLE agentsapp_templates IS 'Pre-built agent templates';

COMMENT ON COLUMN agentsapp_agents.config IS 'JSONB configuration for agent (nodes, edges, code, integrations)';
COMMENT ON COLUMN agentsapp_executions.duration_ms IS 'Execution duration in milliseconds';

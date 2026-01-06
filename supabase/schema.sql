-- Focus Interview Guide Generator - Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Seniority Levels Enum
CREATE TYPE seniority_level AS ENUM ('junior', 'mid', 'senior', 'leadership');

-- Question Types Enum
CREATE TYPE question_type AS ENUM ('star', 'hypothetical', 'values');

-- Competency Categories Enum
CREATE TYPE competency_category AS ENUM ('universal', 'role_specific');

-- ============================================
-- TABLES
-- ============================================

-- Roles Table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Competencies Table
CREATE TABLE competencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  category competency_category NOT NULL DEFAULT 'universal',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role-Competency Mapping (with weights)
CREATE TABLE role_competencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
  weight DECIMAL(3,2) DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, competency_id)
);

-- Questions Table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  minimum_seniority seniority_level NOT NULL DEFAULT 'junior',
  question_type question_type NOT NULL DEFAULT 'star',
  follow_up_probes TEXT[] DEFAULT ARRAY[]::TEXT[],
  quality_rating DECIMAL(3,2) DEFAULT 1.0 CHECK (quality_rating >= 0 AND quality_rating <= 2),
  
  -- Unique rubric for this question
  rubric_score_1 TEXT NOT NULL, -- Below Bar
  rubric_score_2 TEXT NOT NULL, -- Approaching Bar
  rubric_score_3 TEXT NOT NULL, -- Meets Bar
  rubric_score_4 TEXT NOT NULL, -- Exceeds Bar
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question-Competency Mapping (primary and secondary competencies)
CREATE TABLE question_competencies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  competency_id UUID NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, competency_id)
);

-- Question-Role Mapping (which roles this question applies to)
CREATE TABLE question_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, role_id)
);

-- Generated Guides (for analytics in V2)
CREATE TABLE generated_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID NOT NULL REFERENCES roles(id),
  seniority_level seniority_level NOT NULL,
  question_ids UUID[] NOT NULL,
  generated_by TEXT, -- Email from Google OAuth
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_questions_seniority ON questions(minimum_seniority);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_question_roles_role ON question_roles(role_id);
CREATE INDEX idx_question_competencies_question ON question_competencies(question_id);
CREATE INDEX idx_role_competencies_role ON role_competencies(role_id);
CREATE INDEX idx_generated_guides_role ON generated_guides(role_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_guides ENABLE ROW LEVEL SECURITY;

-- Read access for authenticated users (Focus team members)
CREATE POLICY "Read access for authenticated users" ON roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Read access for authenticated users" ON competencies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Read access for authenticated users" ON role_competencies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Read access for authenticated users" ON questions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Read access for authenticated users" ON question_competencies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Read access for authenticated users" ON question_roles
  FOR SELECT TO authenticated USING (true);

-- Users can insert their own generated guides
CREATE POLICY "Insert own guides" ON generated_guides
  FOR INSERT TO authenticated 
  WITH CHECK (generated_by = auth.jwt() ->> 'email');

CREATE POLICY "Read own guides" ON generated_guides
  FOR SELECT TO authenticated 
  USING (generated_by = auth.jwt() ->> 'email');

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get questions for a role and seniority level
CREATE OR REPLACE FUNCTION get_questions_for_role(
  p_role_id UUID,
  p_seniority seniority_level,
  p_limit INTEGER DEFAULT 15
)
RETURNS TABLE (
  id UUID,
  text TEXT,
  minimum_seniority seniority_level,
  question_type question_type,
  follow_up_probes TEXT[],
  rubric_score_1 TEXT,
  rubric_score_2 TEXT,
  rubric_score_3 TEXT,
  rubric_score_4 TEXT,
  competency_names TEXT[],
  competency_weight DECIMAL
) 
LANGUAGE plpgsql
AS $$
DECLARE
  seniority_order INTEGER;
BEGIN
  -- Get numeric order for seniority comparison
  seniority_order := CASE p_seniority
    WHEN 'junior' THEN 1
    WHEN 'mid' THEN 2
    WHEN 'senior' THEN 3
    WHEN 'leadership' THEN 4
  END;

  RETURN QUERY
  SELECT DISTINCT
    q.id,
    q.text,
    q.minimum_seniority,
    q.question_type,
    q.follow_up_probes,
    q.rubric_score_1,
    q.rubric_score_2,
    q.rubric_score_3,
    q.rubric_score_4,
    ARRAY_AGG(DISTINCT c.name) AS competency_names,
    COALESCE(MAX(rc.weight), 1.0) AS competency_weight
  FROM questions q
  JOIN question_roles qr ON qr.question_id = q.id
  JOIN question_competencies qc ON qc.question_id = q.id
  JOIN competencies c ON c.id = qc.competency_id
  LEFT JOIN role_competencies rc ON rc.role_id = p_role_id AND rc.competency_id = c.id
  WHERE qr.role_id = p_role_id
    AND (
      CASE q.minimum_seniority
        WHEN 'junior' THEN 1
        WHEN 'mid' THEN 2
        WHEN 'senior' THEN 3
        WHEN 'leadership' THEN 4
      END
    ) <= seniority_order
  GROUP BY q.id, q.text, q.minimum_seniority, q.question_type, 
           q.follow_up_probes, q.rubric_score_1, q.rubric_score_2, 
           q.rubric_score_3, q.rubric_score_4
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$;

-- ============================================
-- SEED DATA: Roles
-- ============================================

INSERT INTO roles (name, description) VALUES
  ('Technical Program Manager', 'Drives complex technical programs across teams, managing dependencies, risks, and stakeholder communication in government modernization projects.'),
  ('Technical Product Manager', 'Defines product vision and strategy for government digital services, balancing user needs, technical feasibility, and policy constraints.'),
  ('Engineer - Fullstack', 'Builds end-to-end features across frontend and backend, with emphasis on accessibility, security, and maintainability.'),
  ('Engineer - Infrastructure', 'Designs and maintains cloud infrastructure, CI/CD pipelines, and security compliance frameworks (FedRAMP, ATO).'),
  ('Engineer - Frontend', 'Creates accessible, performant user interfaces following USWDS standards and Section 508 compliance.'),
  ('Engineer - Data', 'Builds data pipelines, analytics systems, and reporting infrastructure for government program insights.'),
  ('Engineer - ML/AI', 'Develops machine learning solutions for government applications with emphasis on explainability and fairness.'),
  ('Designer - Service Design', 'Maps end-to-end service journeys and designs holistic experiences across digital and offline touchpoints.'),
  ('Designer - UX/UI', 'Creates user-centered interfaces that are accessible, intuitive, and aligned with government design standards.'),
  ('Designer - Content Design', 'Crafts clear, plain-language content that helps users understand and complete government services.'),
  ('Business Analyst', 'Bridges technical and business teams, eliciting requirements, analyzing processes, and ensuring solutions meet stakeholder needs.'),
  ('Technical Writer', 'Creates clear documentation for technical systems, APIs, user guides, and compliance requirements.');

-- ============================================
-- SEED DATA: Competencies
-- ============================================

-- Universal Competencies
INSERT INTO competencies (name, description, category) VALUES
  ('Mission Alignment', 'Commitment to public service and social impact; prioritizing citizen outcomes over personal gain.', 'universal'),
  ('Collaboration', 'Cross-functional teamwork in ambiguous environments; building trust across diverse stakeholders.', 'universal'),
  ('Communication', 'Stakeholder management and technical translation; adapting message to audience.', 'universal'),
  ('Adaptability', 'Thriving in government constraints and shifting priorities; navigating bureaucracy effectively.', 'universal'),
  ('Ownership', 'Autonomous decision-making and accountability; taking initiative without waiting for direction.', 'universal');

-- Role-Specific Competencies
INSERT INTO competencies (name, description, category) VALUES
  ('Dependency Management', 'Managing complex interdependencies across systems, teams, and organizations.', 'role_specific'),
  ('Risk Identification', 'Proactively identifying and mitigating risks before they impact delivery.', 'role_specific'),
  ('Stakeholder Navigation', 'Building relationships and influence in bureaucratic contexts.', 'role_specific'),
  ('Delivery Optimization', 'Improving processes to accelerate delivery while maintaining quality.', 'role_specific'),
  ('User Research', 'Conducting research with diverse users in government contexts.', 'role_specific'),
  ('Prioritization', 'Making tradeoffs under constraints with clear rationale.', 'role_specific'),
  ('Outcome Definition', 'Defining measurable success criteria aligned to mission.', 'role_specific'),
  ('Technical Feasibility', 'Assessing what''s buildable within constraints and timelines.', 'role_specific'),
  ('Technical Problem Solving', 'Debugging, architecting, and solving complex technical challenges.', 'role_specific'),
  ('Code Quality', 'Writing maintainable, tested, well-documented code.', 'role_specific'),
  ('Accessibility Compliance', 'Building systems that meet Section 508 and WCAG standards.', 'role_specific'),
  ('Security Compliance', 'Implementing security best practices and compliance frameworks.', 'role_specific'),
  ('Knowledge Transfer', 'Documenting and teaching to reduce key-person dependencies.', 'role_specific'),
  ('User-Centered Design', 'Designing solutions that prioritize user needs and experiences.', 'role_specific'),
  ('Accessibility Design', 'Designing for users with diverse abilities and needs.', 'role_specific'),
  ('Design Justification', 'Articulating design decisions with evidence and rationale.', 'role_specific'),
  ('Iterative Improvement', 'Continuously improving based on research and feedback.', 'role_specific'),
  ('Requirements Elicitation', 'Drawing out clear requirements from ambiguous situations.', 'role_specific'),
  ('Process Documentation', 'Creating clear documentation of processes and systems.', 'role_specific'),
  ('Audience Communication', 'Tailoring communication to different technical and non-technical audiences.', 'role_specific'),
  ('Data Analysis', 'Analyzing data to inform decisions and recommendations.', 'role_specific');

-- Note: Role-Competency mappings and Questions will be inserted via a separate seed script
-- due to the volume of data (200+ questions with unique rubrics)

-- Focus Interview Guide Generator - Seed Data Part 1
-- Role-Competency Mappings and Initial Questions
-- Run this AFTER schema.sql

-- ============================================
-- ROLE-COMPETENCY MAPPINGS
-- ============================================

-- Get role and competency IDs for mapping
DO $$
DECLARE
  -- Role IDs
  r_tpm UUID; r_tprm UUID; r_fullstack UUID; r_infra UUID; r_frontend UUID;
  r_data UUID; r_ml UUID; r_service UUID; r_ux UUID; r_content UUID;
  r_ba UUID; r_tw UUID;
  
  -- Competency IDs (Universal)
  c_mission UUID; c_collab UUID; c_comm UUID; c_adapt UUID; c_owner UUID;
  
  -- Competency IDs (Role-specific)
  c_depend UUID; c_risk UUID; c_stake UUID; c_deliver UUID;
  c_research UUID; c_prior UUID; c_outcome UUID; c_feasib UUID;
  c_techprob UUID; c_codequal UUID; c_access UUID; c_security UUID;
  c_knowledge UUID; c_userdesign UUID; c_accessdesign UUID;
  c_justify UUID; c_iterate UUID; c_require UUID; c_procdoc UUID;
  c_audience UUID; c_dataanalysis UUID;

BEGIN
  -- Get Role IDs
  SELECT id INTO r_tpm FROM roles WHERE name = 'Technical Program Manager';
  SELECT id INTO r_tprm FROM roles WHERE name = 'Technical Product Manager';
  SELECT id INTO r_fullstack FROM roles WHERE name = 'Engineer - Fullstack';
  SELECT id INTO r_infra FROM roles WHERE name = 'Engineer - Infrastructure';
  SELECT id INTO r_frontend FROM roles WHERE name = 'Engineer - Frontend';
  SELECT id INTO r_data FROM roles WHERE name = 'Engineer - Data';
  SELECT id INTO r_ml FROM roles WHERE name = 'Engineer - ML/AI';
  SELECT id INTO r_service FROM roles WHERE name = 'Designer - Service Design';
  SELECT id INTO r_ux FROM roles WHERE name = 'Designer - UX/UI';
  SELECT id INTO r_content FROM roles WHERE name = 'Designer - Content Design';
  SELECT id INTO r_ba FROM roles WHERE name = 'Business Analyst';
  SELECT id INTO r_tw FROM roles WHERE name = 'Technical Writer';

  -- Get Competency IDs (Universal)
  SELECT id INTO c_mission FROM competencies WHERE name = 'Mission Alignment';
  SELECT id INTO c_collab FROM competencies WHERE name = 'Collaboration';
  SELECT id INTO c_comm FROM competencies WHERE name = 'Communication';
  SELECT id INTO c_adapt FROM competencies WHERE name = 'Adaptability';
  SELECT id INTO c_owner FROM competencies WHERE name = 'Ownership';

  -- Get Competency IDs (Role-specific)
  SELECT id INTO c_depend FROM competencies WHERE name = 'Dependency Management';
  SELECT id INTO c_risk FROM competencies WHERE name = 'Risk Identification';
  SELECT id INTO c_stake FROM competencies WHERE name = 'Stakeholder Navigation';
  SELECT id INTO c_deliver FROM competencies WHERE name = 'Delivery Optimization';
  SELECT id INTO c_research FROM competencies WHERE name = 'User Research';
  SELECT id INTO c_prior FROM competencies WHERE name = 'Prioritization';
  SELECT id INTO c_outcome FROM competencies WHERE name = 'Outcome Definition';
  SELECT id INTO c_feasib FROM competencies WHERE name = 'Technical Feasibility';
  SELECT id INTO c_techprob FROM competencies WHERE name = 'Technical Problem Solving';
  SELECT id INTO c_codequal FROM competencies WHERE name = 'Code Quality';
  SELECT id INTO c_access FROM competencies WHERE name = 'Accessibility Compliance';
  SELECT id INTO c_security FROM competencies WHERE name = 'Security Compliance';
  SELECT id INTO c_knowledge FROM competencies WHERE name = 'Knowledge Transfer';
  SELECT id INTO c_userdesign FROM competencies WHERE name = 'User-Centered Design';
  SELECT id INTO c_accessdesign FROM competencies WHERE name = 'Accessibility Design';
  SELECT id INTO c_justify FROM competencies WHERE name = 'Design Justification';
  SELECT id INTO c_iterate FROM competencies WHERE name = 'Iterative Improvement';
  SELECT id INTO c_require FROM competencies WHERE name = 'Requirements Elicitation';
  SELECT id INTO c_procdoc FROM competencies WHERE name = 'Process Documentation';
  SELECT id INTO c_audience FROM competencies WHERE name = 'Audience Communication';
  SELECT id INTO c_dataanalysis FROM competencies WHERE name = 'Data Analysis';

  -- TPM Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_tpm, c_mission, 1.0), (r_tpm, c_collab, 1.2), (r_tpm, c_comm, 1.5),
    (r_tpm, c_adapt, 1.0), (r_tpm, c_owner, 1.2),
    (r_tpm, c_depend, 1.5), (r_tpm, c_risk, 1.5), (r_tpm, c_stake, 1.5),
    (r_tpm, c_deliver, 1.3);

  -- TPrM Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_tprm, c_mission, 1.2), (r_tprm, c_collab, 1.2), (r_tprm, c_comm, 1.3),
    (r_tprm, c_adapt, 1.0), (r_tprm, c_owner, 1.2),
    (r_tprm, c_research, 1.5), (r_tprm, c_prior, 1.5), (r_tprm, c_outcome, 1.5),
    (r_tprm, c_feasib, 1.3), (r_tprm, c_stake, 1.2);

  -- Fullstack Engineer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_fullstack, c_mission, 1.0), (r_fullstack, c_collab, 1.0), (r_fullstack, c_comm, 1.0),
    (r_fullstack, c_adapt, 1.0), (r_fullstack, c_owner, 1.2),
    (r_fullstack, c_techprob, 1.5), (r_fullstack, c_codequal, 1.5),
    (r_fullstack, c_access, 1.3), (r_fullstack, c_security, 1.3), (r_fullstack, c_knowledge, 1.2);

  -- Infrastructure Engineer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_infra, c_mission, 1.0), (r_infra, c_collab, 1.0), (r_infra, c_comm, 1.0),
    (r_infra, c_adapt, 1.0), (r_infra, c_owner, 1.2),
    (r_infra, c_techprob, 1.5), (r_infra, c_security, 1.5),
    (r_infra, c_codequal, 1.3), (r_infra, c_knowledge, 1.3);

  -- Frontend Engineer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_frontend, c_mission, 1.0), (r_frontend, c_collab, 1.0), (r_frontend, c_comm, 1.0),
    (r_frontend, c_adapt, 1.0), (r_frontend, c_owner, 1.2),
    (r_frontend, c_techprob, 1.3), (r_frontend, c_codequal, 1.5),
    (r_frontend, c_access, 1.5), (r_frontend, c_knowledge, 1.2);

  -- Data Engineer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_data, c_mission, 1.0), (r_data, c_collab, 1.0), (r_data, c_comm, 1.0),
    (r_data, c_adapt, 1.0), (r_data, c_owner, 1.2),
    (r_data, c_techprob, 1.5), (r_data, c_codequal, 1.3),
    (r_data, c_dataanalysis, 1.5), (r_data, c_knowledge, 1.3);

  -- ML/AI Engineer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_ml, c_mission, 1.2), (r_ml, c_collab, 1.0), (r_ml, c_comm, 1.2),
    (r_ml, c_adapt, 1.0), (r_ml, c_owner, 1.2),
    (r_ml, c_techprob, 1.5), (r_ml, c_codequal, 1.3),
    (r_ml, c_dataanalysis, 1.3), (r_ml, c_knowledge, 1.3);

  -- Service Designer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_service, c_mission, 1.2), (r_service, c_collab, 1.3), (r_service, c_comm, 1.3),
    (r_service, c_adapt, 1.0), (r_service, c_owner, 1.0),
    (r_service, c_research, 1.5), (r_service, c_userdesign, 1.5),
    (r_service, c_stake, 1.3), (r_service, c_iterate, 1.3);

  -- UX/UI Designer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_ux, c_mission, 1.0), (r_ux, c_collab, 1.2), (r_ux, c_comm, 1.2),
    (r_ux, c_adapt, 1.0), (r_ux, c_owner, 1.0),
    (r_ux, c_userdesign, 1.5), (r_ux, c_accessdesign, 1.5),
    (r_ux, c_justify, 1.3), (r_ux, c_iterate, 1.3);

  -- Content Designer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_content, c_mission, 1.2), (r_content, c_collab, 1.2), (r_content, c_comm, 1.5),
    (r_content, c_adapt, 1.0), (r_content, c_owner, 1.0),
    (r_content, c_userdesign, 1.3), (r_content, c_accessdesign, 1.3),
    (r_content, c_audience, 1.5), (r_content, c_iterate, 1.3);

  -- Business Analyst Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_ba, c_mission, 1.0), (r_ba, c_collab, 1.3), (r_ba, c_comm, 1.5),
    (r_ba, c_adapt, 1.2), (r_ba, c_owner, 1.0),
    (r_ba, c_require, 1.5), (r_ba, c_procdoc, 1.3),
    (r_ba, c_dataanalysis, 1.3), (r_ba, c_stake, 1.3);

  -- Technical Writer Competencies
  INSERT INTO role_competencies (role_id, competency_id, weight) VALUES
    (r_tw, c_mission, 1.0), (r_tw, c_collab, 1.2), (r_tw, c_comm, 1.5),
    (r_tw, c_adapt, 1.0), (r_tw, c_owner, 1.0),
    (r_tw, c_procdoc, 1.5), (r_tw, c_audience, 1.5),
    (r_tw, c_knowledge, 1.3), (r_tw, c_iterate, 1.2);

END $$;

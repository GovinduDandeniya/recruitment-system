const { v4: uuidv4 } = require('uuid');

/**
 * Candidate schema definition.
 *
 * Fields:
 *   id            - UUID (auto-generated)
 *   name          - Full name
 *   stage         - One of STAGES
 *   appliedAt     - ISO date string
 *   score         - Number 1–5 (null if not yet scored)
 *   isReferred    - Boolean
 *   hasAssessment - Boolean (true = assessment added, false = pending)
 */

const STAGES = ['Applying Period', 'Screening', 'Interview', 'Test'];

/**
 * Creates a validated candidate object.
 * Throws if required fields are missing or invalid.
 */
function createCandidate({ name, stage, appliedAt, score = null, isReferred = false, hasAssessment = false }) {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('name is required');
  }
  if (!STAGES.includes(stage)) {
    throw new Error(`stage must be one of: ${STAGES.join(', ')}`);
  }
  if (!appliedAt || isNaN(Date.parse(appliedAt))) {
    throw new Error('appliedAt must be a valid date string');
  }
  if (score !== null && (typeof score !== 'number' || score < 1 || score > 5)) {
    throw new Error('score must be a number between 1 and 5, or null');
  }

  return {
    id: uuidv4(),
    name: name.trim(),
    stage,
    appliedAt,
    score,
    isReferred: Boolean(isReferred),
    hasAssessment: Boolean(hasAssessment),
  };
}

module.exports = { STAGES, createCandidate };

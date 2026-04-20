const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store.
 * Seeded with dummy candidates matching the recruitment pipeline UI.
 * Data resets on server restart.
 */

let candidates = [
  // --- Applying Period (27 total shown, 4 visible in UI) ---
  {
    id: uuidv4(),
    name: 'Marlon Reynolds',
    stage: 'Applying Period',
    appliedAt: '2023-10-29',
    score: 3.5,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Regina Hane',
    stage: 'Applying Period',
    appliedAt: '2023-10-29',
    score: 2,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Curtis Baumbach',
    stage: 'Applying Period',
    appliedAt: '2023-10-29',
    score: 3,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Jaime Anderson',
    stage: 'Applying Period',
    appliedAt: '2023-10-29',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },
  {
    id: uuidv4(),
    name: 'Cassandra Hartmann',
    stage: 'Applying Period',
    appliedAt: '2023-10-18',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },
  {
    id: uuidv4(),
    name: 'Felix Merritt',
    stage: 'Applying Period',
    appliedAt: '2023-10-17',
    score: 4,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Tanya Nguyen',
    stage: 'Applying Period',
    appliedAt: '2023-10-16',
    score: 3,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Harold Kim',
    stage: 'Applying Period',
    appliedAt: '2023-10-15',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },

  // --- Screening (23 total shown, 4 visible in UI) ---
  {
    id: uuidv4(),
    name: 'Kristi Sipes',
    stage: 'Screening',
    appliedAt: '2023-10-20',
    score: 3.5,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Randy Dibbert',
    stage: 'Screening',
    appliedAt: '2023-10-18',
    score: 3.5,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Jane Anderson',
    stage: 'Screening',
    appliedAt: '2023-10-18',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },
  {
    id: uuidv4(),
    name: 'Shelia Doyle',
    stage: 'Screening',
    appliedAt: '2023-10-13',
    score: 4.5,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Marcus Webb',
    stage: 'Screening',
    appliedAt: '2023-10-12',
    score: 3,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Priya Patel',
    stage: 'Screening',
    appliedAt: '2023-10-10',
    score: 4,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Derek Stone',
    stage: 'Screening',
    appliedAt: '2023-10-08',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },

  // --- Interview (3 visible in UI) ---
  {
    id: uuidv4(),
    name: 'Cameron Dickens',
    stage: 'Interview',
    appliedAt: '2023-09-03',
    score: 4,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Merle Vandervort',
    stage: 'Interview',
    appliedAt: '2023-09-09',
    score: 4,
    isReferred: false,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Jasmine Wiza',
    stage: 'Interview',
    appliedAt: '2023-09-10',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },

  // --- Test (2 visible in UI) ---
  {
    id: uuidv4(),
    name: 'Lola Kirlin',
    stage: 'Test',
    appliedAt: '2023-09-03',
    score: 4.5,
    isReferred: true,
    hasAssessment: true,
  },
  {
    id: uuidv4(),
    name: 'Virgil Larkin',
    stage: 'Test',
    appliedAt: '2023-09-03',
    score: null,
    isReferred: false,
    hasAssessment: false,
  },
];

/** Returns a shallow copy of the store array. */
function getAll() {
  return [...candidates];
}

/** Returns a single candidate by id, or undefined. */
function getById(id) {
  return candidates.find((c) => c.id === id);
}

/** Inserts a new candidate object and returns it. */
function insert(candidate) {
  candidates.push(candidate);
  return candidate;
}

/** Replaces a candidate by id. Returns the updated object or null. */
function update(id, updates) {
  const index = candidates.findIndex((c) => c.id === id);
  if (index === -1) return null;
  candidates[index] = { ...candidates[index], ...updates, id };
  return candidates[index];
}

/** Removes a candidate by id. Returns true if removed, false if not found. */
function remove(id) {
  const index = candidates.findIndex((c) => c.id === id);
  if (index === -1) return false;
  candidates.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, insert, update, remove };

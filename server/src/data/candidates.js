const { v4: uuidv4 } = require('uuid');

/**
 * In-memory data store.
 * Seeded with dummy candidates matching the recruitment pipeline UI.
 * Data resets on server restart.
 */

let candidates = [
  // --- Applying Period (27) ---
  { id: uuidv4(), name: 'Marlon Reynolds',   stage: 'Applying Period', appliedAt: '2023-10-29', score: 3.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Regina Hane',        stage: 'Applying Period', appliedAt: '2023-10-29', score: 2,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Curtis Baumbach',    stage: 'Applying Period', appliedAt: '2023-10-29', score: 3,   isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Jaime Anderson',     stage: 'Applying Period', appliedAt: '2023-10-29', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Cassandra Hartmann', stage: 'Applying Period', appliedAt: '2023-10-18', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Felix Merritt',      stage: 'Applying Period', appliedAt: '2023-10-17', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Tanya Nguyen',       stage: 'Applying Period', appliedAt: '2023-10-16', score: 3,   isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Harold Kim',         stage: 'Applying Period', appliedAt: '2023-10-15', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Elena Vasquez',      stage: 'Applying Period', appliedAt: '2023-10-14', score: 2.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Patrick Nguyen',     stage: 'Applying Period', appliedAt: '2023-10-13', score: 3,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Sara McLaughlin',    stage: 'Applying Period', appliedAt: '2023-10-12', score: null,isReferred: true,  hasAssessment: false },
  { id: uuidv4(), name: 'David Okonkwo',      stage: 'Applying Period', appliedAt: '2023-10-11', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Mia Zhou',           stage: 'Applying Period', appliedAt: '2023-10-10', score: 3.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Jake Thompson',      stage: 'Applying Period', appliedAt: '2023-10-09', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Aisha Diallo',       stage: 'Applying Period', appliedAt: '2023-10-08', score: 2,   isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Nathan Park',        stage: 'Applying Period', appliedAt: '2023-10-07', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Chloe Bennett',      stage: 'Applying Period', appliedAt: '2023-10-06', score: 3,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Omar Sheikh',        stage: 'Applying Period', appliedAt: '2023-10-05', score: 4.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Laura Ramos',        stage: 'Applying Period', appliedAt: '2023-10-04', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Kevin Walsh',        stage: 'Applying Period', appliedAt: '2023-10-03', score: 2.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Priya Sharma',       stage: 'Applying Period', appliedAt: '2023-10-02', score: 3,   isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Tom Eriksson',       stage: 'Applying Period', appliedAt: '2023-10-01', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Yuki Tanaka',        stage: 'Applying Period', appliedAt: '2023-09-30', score: 1.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Rosa Martinez',      stage: 'Applying Period', appliedAt: '2023-09-29', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Ben Adeyemi',        stage: 'Applying Period', appliedAt: '2023-09-28', score: 3.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Isla Fletcher',      stage: 'Applying Period', appliedAt: '2023-09-27', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Carlos Rivera',      stage: 'Applying Period', appliedAt: '2023-09-26', score: 2,   isReferred: false, hasAssessment: true  },

  // --- Screening (23) ---
  { id: uuidv4(), name: 'Kristi Sipes',       stage: 'Screening', appliedAt: '2023-10-20', score: 3.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Randy Dibbert',      stage: 'Screening', appliedAt: '2023-10-18', score: 3.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Jane Anderson',      stage: 'Screening', appliedAt: '2023-10-18', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Shelia Doyle',       stage: 'Screening', appliedAt: '2023-10-13', score: 4.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Marcus Webb',        stage: 'Screening', appliedAt: '2023-10-12', score: 3,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Priya Patel',        stage: 'Screening', appliedAt: '2023-10-10', score: 4,   isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Derek Stone',        stage: 'Screening', appliedAt: '2023-10-08', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Fiona Gallagher',    stage: 'Screening', appliedAt: '2023-10-07', score: 3,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Leo Watkins',        stage: 'Screening', appliedAt: '2023-10-06', score: 2.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Amara Osei',         stage: 'Screening', appliedAt: '2023-10-05', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Sam Buchanan',       stage: 'Screening', appliedAt: '2023-10-04', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Hana Yamamoto',      stage: 'Screening', appliedAt: '2023-10-03', score: 3.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Reza Tehrani',       stage: 'Screening', appliedAt: '2023-10-02', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Liam O\'Brien',      stage: 'Screening', appliedAt: '2023-10-01', score: 2,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Nadia Kozlov',       stage: 'Screening', appliedAt: '2023-09-30', score: 4.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Tyler Moss',         stage: 'Screening', appliedAt: '2023-09-29', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Grace Holloway',     stage: 'Screening', appliedAt: '2023-09-28', score: 3,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Ivan Petrov',        stage: 'Screening', appliedAt: '2023-09-27', score: 3.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Zara Ahmed',         stage: 'Screening', appliedAt: '2023-09-26', score: null,isReferred: true,  hasAssessment: false },
  { id: uuidv4(), name: 'Miles Cooper',       stage: 'Screening', appliedAt: '2023-09-25', score: 2.5, isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Valentina Cruz',     stage: 'Screening', appliedAt: '2023-09-24', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'James Okafor',       stage: 'Screening', appliedAt: '2023-09-23', score: null,isReferred: false, hasAssessment: false },
  { id: uuidv4(), name: 'Sophie Laurent',     stage: 'Screening', appliedAt: '2023-09-22', score: 3,   isReferred: true,  hasAssessment: true  },

  // --- Interview (3) ---
  { id: uuidv4(), name: 'Cameron Dickens',    stage: 'Interview', appliedAt: '2023-09-03', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Merle Vandervort',   stage: 'Interview', appliedAt: '2023-09-09', score: 4,   isReferred: false, hasAssessment: true  },
  { id: uuidv4(), name: 'Jasmine Wiza',       stage: 'Interview', appliedAt: '2023-09-10', score: null,isReferred: false, hasAssessment: false },

  // --- Test (2) ---
  { id: uuidv4(), name: 'Lola Kirlin',        stage: 'Test', appliedAt: '2023-09-03', score: 4.5, isReferred: true,  hasAssessment: true  },
  { id: uuidv4(), name: 'Virgil Larkin',      stage: 'Test', appliedAt: '2023-09-03', score: null,isReferred: false, hasAssessment: false },
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

const store = require('../data/candidates');
const { createCandidate, STAGES } = require('../models/candidate');

/**
 * GET /api/candidates
 * Query params:
 *   stage    - filter by stage name (e.g. "Screening")
 *   sort     - field to sort by: name | appliedAt | score (default: appliedAt)
 *   order    - asc | desc (default: desc)
 *   page     - page number, 1-based (default: 1)
 *   limit    - items per page (default: 50, max: 100)
 */
function getAllCandidates(req, res) {
  const { stage, sort = 'appliedAt', order = 'desc', page = '1', limit = '50' } = req.query;

  // Filter
  let candidates = store.getAll();
  if (stage) {
    if (!STAGES.includes(stage)) {
      return res.status(400).json({ error: `Invalid stage. Must be one of: ${STAGES.join(', ')}` });
    }
    candidates = candidates.filter((c) => c.stage === stage);
  }

  // Sort
  const allowedSorts = ['name', 'appliedAt', 'score'];
  const sortField = allowedSorts.includes(sort) ? sort : 'appliedAt';
  const sortDir = order === 'asc' ? 1 : -1;
  candidates.sort((a, b) => {
    const aVal = a[sortField] ?? '';
    const bVal = b[sortField] ?? '';
    if (aVal < bVal) return -1 * sortDir;
    if (aVal > bVal) return 1 * sortDir;
    return 0;
  });

  // Pagination
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const total = candidates.length;
  const totalPages = Math.ceil(total / limitNum);
  const start = (pageNum - 1) * limitNum;
  const paginated = candidates.slice(start, start + limitNum);

  res.json({
    data: paginated,
    meta: { total, page: pageNum, limit: limitNum, totalPages },
  });
}

/** GET /api/candidates/:id */
function getCandidateById(req, res) {
  const candidate = store.getById(req.params.id);
  if (!candidate) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  res.json({ data: candidate });
}

/** POST /api/candidates */
function createCandidateHandler(req, res) {
  try {
    const candidate = createCandidate(req.body);
    const saved = store.insert(candidate);
    res.status(201).json({ data: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/** PUT /api/candidates/:id */
function updateCandidate(req, res) {
  const existing = store.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  // Merge existing with updates, then validate by re-creating
  const merged = { ...existing, ...req.body };
  try {
    // Validate via model (strip auto-generated id so it gets re-applied)
    const { id, ...fields } = merged;
    createCandidate(fields); // throws if invalid
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const updated = store.update(req.params.id, req.body);
  res.json({ data: updated });
}

/** DELETE /api/candidates/:id */
function deleteCandidate(req, res) {
  const removed = store.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  res.status(204).send();
}

/**
 * PATCH /api/candidates/:id/stage
 * Body: { stage: "Interview" }
 * Moves a candidate to a new stage (drag-and-drop support).
 */
function updateStage(req, res) {
  const { stage } = req.body;
  if (!stage || !STAGES.includes(stage)) {
    return res.status(400).json({ error: `stage must be one of: ${STAGES.join(', ')}` });
  }
  const existing = store.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Candidate not found' });
  }
  const updated = store.update(req.params.id, { stage });
  res.json({ data: updated });
}

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidateHandler,
  updateCandidate,
  deleteCandidate,
  updateStage,
};

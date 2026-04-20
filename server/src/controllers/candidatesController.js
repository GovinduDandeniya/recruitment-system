const store = require('../data/candidates');
const { createCandidate } = require('../models/candidate');

/** GET /api/candidates */
function getAllCandidates(req, res) {
  const candidates = store.getAll();
  res.json({ data: candidates, total: candidates.length });
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

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidateHandler,
  updateCandidate,
  deleteCandidate,
};

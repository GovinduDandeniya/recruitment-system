const { Router } = require('express');
const {
  getAllCandidates,
  getCandidateById,
  createCandidateHandler,
  updateCandidate,
  deleteCandidate,
  updateStage,
} = require('../controllers/candidatesController');

const router = Router();

router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);
router.post('/', createCandidateHandler);
router.put('/:id', updateCandidate);
router.patch('/:id/stage', updateStage);
router.delete('/:id', deleteCandidate);

module.exports = router;

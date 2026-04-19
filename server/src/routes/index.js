const { Router } = require('express');
const router = Router();

// Candidate routes will be mounted here in the next commit
// router.use('/candidates', require('./candidates'));

router.get('/', (req, res) => {
  res.json({ message: 'Recruitment API v1.0' });
});

module.exports = router;

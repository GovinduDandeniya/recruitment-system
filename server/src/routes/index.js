const { Router } = require('express');
const router = Router();
const candidatesRouter = require('./candidates');

router.get('/', (req, res) => {
  res.json({ message: 'Recruitment API v1.0' });
});

router.use('/candidates', candidatesRouter);

module.exports = router;

const { Router } = require('express');
const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/auth', require('./auth.routes'));
router.use('/patients', require('./patient.routes'));
router.use('/users', require('./user.routes'));

// router.use('/examples', require('./example.routes'));
module.exports = router;

const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/', userController.list);
router.delete('/:id', userController.remove);

module.exports = router;

const { Router } = require('express');
const patientController = require('../controllers/patient.controller');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const patientValidator = require('../validators/patient.validator');

const router = Router();

router.use(authenticate);

router.get('/', patientController.list);
router.post('/', validate(patientValidator.create), patientController.create);
router.put('/:id', validate(patientValidator.update), patientController.update);
router.delete('/:id', patientController.remove);

module.exports = router;

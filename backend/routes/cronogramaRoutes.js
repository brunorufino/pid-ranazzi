const express = require('express');
const CronogramaController = require('../controller/cronogramaController');

const router = express.Router();
const cronogramaController = new CronogramaController()

router.get('/', cronogramaController.getAll)
router.post('/',cronogramaController.create)
router.post('/:filtrar',cronogramaController.getByName)
router.put('/', cronogramaController.update)
router.delete('/', cronogramaController.delete)

module.exports=router;
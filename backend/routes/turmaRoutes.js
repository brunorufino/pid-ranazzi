const express = require('express');
const TurmaContoller = require('../controller/turmaController');

const router = express.Router();
const turmaController = new TurmaContoller

router.get('/',turmaController.getAll)
router.get('/:codigo',turmaController.getByCodigo)
router.post('/',turmaController.create)
router.post('/:filtrar',turmaController.getByName)
router.put('/',turmaController.update)
router.delete('/:codigo',turmaController.delete)

module.exports=router;
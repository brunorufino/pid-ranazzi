const express = require('express');
const MatriculaController = require('../controller/matriculaController');

const router = express.Router();
const matriculaContrroller = new MatriculaController

router.get('/',matriculaContrroller.getAll)
router.get('/:codigo',matriculaContrroller.getByCodigo)
router.post('/',matriculaContrroller.create)
router.delete('/:codigo',matriculaContrroller.delete)

module.exports=router;
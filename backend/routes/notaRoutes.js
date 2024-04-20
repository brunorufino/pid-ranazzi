const express = require('express');
const notasContoller = require('../controller/notasController');

const router = express.Router();
const notasController = new notasContoller

router.get('/',notasController.getAll)
router.get('/:codigo',notasController.getByCodigo)
router.post('/',notasController.create)
router.post('/:filtrar',notasController.getByName)
router.put('/',notasController.update)
router.delete('/:codigo',notasController.delete)

module.exports=router;
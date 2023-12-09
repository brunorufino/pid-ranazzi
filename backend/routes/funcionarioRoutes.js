const express = require('express');
const FucionarioContoller = require('../controller/funcionarioController');

const router = express.Router();
const funcionarioController = new FucionarioContoller

router.get('/',funcionarioController.getAll)
router.get('/:cpf',funcionarioController.getByDocumento)
router.post('/',funcionarioController.create)
router.post('/:filtrar',funcionarioController.getByName)
router.put('/',funcionarioController.update)
router.delete('/:codigo',funcionarioController.delete)
module.exports=router;
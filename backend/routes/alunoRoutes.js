const express = require('express');
const AlunoController = require('../controller/alunoController');

const router = express.Router();
const alunoController = new AlunoController;

router.get('/',alunoController.getAll)
router.get('/:cpf',alunoController.getByCpf)
router.post('/',alunoController.create)
router.post('/:nome',alunoController.getByNome)
router.put('/',alunoController.update)
router.delete('/:cpf',alunoController.delete)

module.exports = router;
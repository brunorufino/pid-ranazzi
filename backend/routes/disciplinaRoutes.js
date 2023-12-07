const express = require('express')
const router = express.Router()

const Disciplina_controller = require('../controller/disciplinaController')
const disciplinaController = new Disciplina_controller()

router.get('/', disciplinaController.getAll)
router.get('/:id', disciplinaController.getById)
router.delete('/:id', disciplinaController.delete)
router.post('/', disciplinaController.create)
router.post('/:nome', disciplinaController.getByNome)
router.put('/:id', disciplinaController.update)

module.exports = router
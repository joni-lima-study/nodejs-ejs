const express = require("express");
const router = express.Router();
const alunoController = require("../controllers/alunos-controller")


router.get("/boletim", alunoController.listar_boletim);

router.get("/cadastrarBoletim", alunoController.cadastrar_boletim_get),
router.post("/cadastrarBoletim", alunoController.cadastrar_boletim_post);

router.get("/deletarBoletim/:id", alunoController.deletar_boletim);


router.get("/editarBoletim/:id", alunoController.editar_boletim_get);
router.post("/editarBoletim", alunoController.editar_boletim_post);


module.exports = router;
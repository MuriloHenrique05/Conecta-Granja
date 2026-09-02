import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import RacaoController from "../controller/RacaoController.js";

const router = Router();

router.post("/", AuthMiddleware.auth, RacaoController.create);
router.get("/", AuthMiddleware.auth, RacaoController.list);
router.get("/:id", AuthMiddleware.auth, RacaoController.show);
router.put("/:id", AuthMiddleware.auth, RacaoController.update);
router.delete("/:id", AuthMiddleware.auth, RacaoController.delete);

export default router;
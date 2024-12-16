
import { Router } from "express"; //micro-aplicação HTTP
import ContaCtrl from "../Controle/contaCtrl.js";

const contCTRL = new ContaCtrl();
const rotaConta = Router();

rotaConta.post("/", contCTRL.gravar);
rotaConta.put("/:codigo", contCTRL.editar);
rotaConta.patch("/:codigo", contCTRL.editar);
rotaConta.delete("/:codigo", contCTRL.excluir);
rotaConta.get("/:codigo", contCTRL.consultar);
rotaConta.get("/",contCTRL.consultar);

export default rotaConta;



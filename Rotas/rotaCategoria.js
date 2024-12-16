//Associar os métodos da camada de controle de produto 
//à requisições GET, POST, PUT, PATCH e DELETE HTTP

import { Router } from "express"; //micro-aplicação HTTP
import TipoContaCtrl from "../Controle/tipoContaCtrl.js";

const tcontaCTRL = new TipoContaCtrl();
const rotaTipoConta = Router();

rotaTipoConta.post("/", tcontaCTRL.gravar);
rotaTipoConta.put("/:codigo", tcontaCTRL.editar);
rotaTipoConta.patch("/:codigo", tcontaCTRL.editar);
rotaTipoConta.delete("/:codigo", tcontaCTRL.excluir);
rotaTipoConta.get("/:codigo", tcontaCTRL.consultar);
rotaTipoConta.get("/",tcontaCTRL.consultar);

export default rotaTipoConta;



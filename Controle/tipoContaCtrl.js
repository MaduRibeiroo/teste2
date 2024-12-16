import TipoConta from "../Modelo/tipoConta.js";

export default class TipoContaCtrl{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")){
            const descricao  = requisicao.body.descricao;
            if (descricao)
            {
                const tipoconta = new TipoConta(0,descricao);
                tipoconta.gravar()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Tipo de conta adicionada com sucesso!",
                        "codigo": tipoconta.codigo
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível incluir o tipo da conta: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados do tipo da conta conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta){
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")){
            const codigo     = requisicao.params.codigo;
            const descricao  = requisicao.body.descricao;
            
            if (codigo > 0 && descricao)
            {
                const tipoconta = new TipoConta(codigo,descricao);
                tipoconta.editar().then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Tipo de conta alterada com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível alterar o tipo da conta: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe corretamente todos os dados do tipo da conta conforme documentação da API."
                    }
                );
            }
        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method == 'DELETE'){
            const codigo = requisicao.params.codigo;
            if (codigo > 0)
            {
                const tipoconta = new TipoConta(codigo);
                tipoconta.excluir()
                .then(()=>{
                    resposta.status(200).json({
                        "status":true,
                        "mensagem":"Tipo de conta excluída com sucesso!",
                    });
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem":"Não foi possível excluir o tipo de conta: " + erro.message
                    });
                });
            }
            else
            {
                resposta.status(400).json(
                    {
                        "status":false,
                        "mensagem":"Informe um código válido do tipo de conta conforme documentação da API."
                    }
                );
            }

        }
        else
        {
            resposta.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method=="GET"){
            let codigo = requisicao.params.codigo;
            if (isNaN(codigo)){
                codigo = "";
            }

            const tipoconta = new TipoConta();
            tipoconta.consultar(codigo)
            .then((listaContas) =>{
                resposta.status(200).json(listaContas);
            })
            .catch((erro) => {
                resposta.status(500).json(
                    {
                        "status":false,
                        "mensagem":"Erro ao consultar tipo de contas:" + erro.message    
                    }
                );
            });

        }
        else
        {
            resposta.status(400).json(
                {
                    "status":false,
                    "mensagem":"Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}
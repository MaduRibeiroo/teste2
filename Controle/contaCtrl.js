import Conta from "../Modelo/conta.js";
import TipoConta from "../Modelo/tipoConta.js";

export default class ContaCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'POST' && requisicao.is("application/json")) {
            const email = requisicao.body.email;
            const nome = requisicao.body.nome;
            const senha = requisicao.body.senha;
            const confSenha = requisicao.body.confSenha;
            const ano = requisicao.body.ano;
            const tipoConta = requisicao.body.tipoConta;
            const tconta = new TipoConta(tipoConta.codigo);
            tconta.consultar(tipoConta.codigo).then((listaContas) => {
                if (listaContas.length > 0) {
                    if (email && nome &&
                        senha && confSenha && ano 
                        && tipoConta.codigo > 0) {

                        const conta = new Conta(0,
                            email, nome, senha,
                            confSenha, ano, tconta);

                        conta.incluir()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Conta adicionada com sucesso!",
                                    "codigo": conta.codigo
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível incluir a conta: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados da conta conforme documentação da API."
                            }
                        );
                    }
                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "O tipo da conta informada não existe!"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar o tipo da conta: " + erro.message
                });
            });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }

    }

    editar(requisicao, resposta) {
        resposta.type("application/json");
        if ((requisicao.method == 'PUT' || requisicao.method == 'PATCH') && requisicao.is("application/json")) {
            const codigo = requisicao.params.codigo;
            const email = requisicao.body.email;
            const nome = requisicao.body.nome;
            const senha = requisicao.body.senha;
            const confSenha = requisicao.body.confSenha;
            const ano = requisicao.body.ano;
            const tipoConta = requisicao.body.tipoConta;
            const tconta = new tipoConta(tipoConta.codigo);
            tconta.consultar(tipoConta.codigo).then((lista) => {
                if (lista.length > 0) {
                    if (codigo > 0 && email && nome > 0 &&
                        senha > 0 && confSenha >= 0 &&
                         ano && tipoConta.codigo > 0) {
                        const conta = new Conta(codigo,
                            email, nome, senha,
                            confSenha, ano, tconta);
                        conta.alterar()
                            .then(() => {
                                resposta.status(200).json({
                                    "status": true,
                                    "mensagem": "Conta alterada com sucesso!",
                                });
                            })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Não foi possível alterar a conta: " + erro.message
                                });
                            });
                    }
                    else {
                        resposta.status(400).json(
                            {
                                "status": false,
                                "mensagem": "Informe corretamente todos os dados da conta conforme documentação da API."
                            }
                        );
                    }

                }
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "O tipo da conta informada não existe!"
                    });
                }

            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Não foi possível validar o tipo da conta: " + erro.message
                });
            });

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == 'DELETE') {
            const codigo = requisicao.params.codigo;
            if (codigo > 0) {
                const conta = new Conta(codigo);
                conta.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Conta excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Não foi possível excluir a conta: " + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json(
                    {
                        "status": false,
                        "mensagem": "Informe um código válido da conta conforme documentação da API."
                    }
                );
            }

        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida! Consulte a documentação da API."
            });

        }
    }

    consultar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method == "GET") {
            let codigo = requisicao.params.codigo;
            if (isNaN(codigo)) {
                codigo = "";
            }

            const conta = new Conta();
            conta.consultar(codigo)
                .then((listaContas) => {
                    resposta.status(200).json(listaContas);
                })
                .catch((erro) => {
                    resposta.status(500).json(
                        {
                            "status": false,
                            "mensagem": "Erro ao consultar as contas: " + erro.message
                        }
                    );
                });

        }
        else {
            resposta.status(400).json(
                {
                    "status": false,
                    "mensagem": "Requisição inválida! Consulte a documentação da API."
                }
            );
        }
    }

}
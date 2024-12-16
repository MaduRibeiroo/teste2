import Conta from "../Modelo/conta.js";
import TipoConta from "../Modelo/tipoConta.js";

import conectar from "./Conexao.js";
export default class ContaDAO {
    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS conta(
                cont_codigo INT NOT NULL AUTO_INCREMENT,
                cont_email VARCHAR(200) NOT NULL,
                cont_nome VARCHAR(200) NOT NULL,
                cont_senha VARCHAR(200) NOT NULL,
                cont_confsenha VARCHAR(200) NOT NULL,
                cont_ano VARCHAR(200) NOT NULL,
                fk_codigo_tconta INT NOT NULL,
                CONSTRAINT pk_conta PRIMARY KEY(cont_codigo),
                CONSTRAINT fk_tipoconta FOREIGN KEY(fk_codigo_tconta) REFERENCES tipoconta(codigo) 
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async incluir(conta) {
        if (conta instanceof Conta) {
            const conexao = await conectar();
            const sql = `INSERT INTO conta(cont_email,cont_nome,cont_senha,cont_confsenha,cont_ano, fk_codigo_tconta)
                values(?,?,?,?,?,?)
            `;
            let parametros = [
                conta.email,
                conta.nome,
                conta.senha,
                conta.confsenha,
                conta.ano,
                conta.tipoconta.codigo
            ]; 
            const resultado = await conexao.execute(sql, parametros);
            conta.codigo = resultado[0].insertId;
            await conexao.release(); 
        }
    }
    async alterar(conta) {
        if (conta instanceof Conta) {
            const conexao = await conectar();
            const sql = `UPDATE conta SET cont_email=?,cont_nome=?,cont_senha=?,cont_confsenha=?,cont_ano=?, fk_codigo_tconta = ?
                WHERE cont_codigo = ?
            `;
            let parametros = [
                conta.email,
                conta.nome,
                conta.senha,
                conta.confsenha,
                conta.ano,
                conta.tipoconta.codigo,
                conta.codigo
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        }
    }
    async consultar(termo) {
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = `SELECT * FROM conta c
                   INNER JOIN tipoconta t ON c.fk_codigo_tconta = t.codigo
                   WHERE cont_email LIKE ?`;
            parametros = ['%' + termo + '%'];
        }
        else {
            sql = `SELECT * FROM conta c
                   INNER JOIN tipoconta t ON c.fk_codigo_tconta = t.codigo 
                   WHERE cont_codigo = ?`
            parametros = [termo];
        }
        const [linhas, campos] = await conexao.execute(sql, parametros);
        let listaContas = [];
        for (const linha of linhas) {
            const tipoconta = new TipoConta(linha['codigo'],linha["descricao"]);    
            const conta = new Conta(
                linha['cont_codigo'],
                linha['cont_email'],
                linha['cont_nome'],
                linha['cont_senha'],
                linha['cont_confsenha'],
                linha['cont_ano'],
                tipoconta
            );
            listaContas.push(conta);
        }
        await conexao.release();
        return listaContas;
    }
    async excluir(conta) {
        if (conta instanceof Conta) {
            const conexao = await conectar();
            const sql = `DELETE FROM conta WHERE cont_codigo = ?`;
            let parametros = [
                conta.codigo
            ]; 
            await conexao.execute(sql, parametros);
            await conexao.release(); 
        }
    }
}
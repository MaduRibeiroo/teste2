import TipoConta from "../Modelo/tipoConta.js";
import conectar from "./Conexao.js";

export default class TipoContaDAO{

    constructor(){
        this.init();
    }

    async init(){
        try{
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS tipoconta(
                    codigo INT NOT NULL AUTO_INCREMENT,
                    descricao VARCHAR(50) NOT NULL,
                    CONSTRAINT pk_tipoconta PRIMARY KEY(codigo)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();

        }
        catch(erro){
            console.log("Erro ao iniciar a tabela tipoconta!");
        }
    }

    async gravar(tipoconta){
        if (tipoconta instanceof TipoConta){
            const conexao = await conectar();
            const sql = "INSERT INTO tipoconta(descricao) VALUES (?)";
            const parametros = [tipoconta.descricao];
            const resultado = await conexao.execute(sql,parametros);
            tipoconta.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }
    
    async editar(tipoconta){
        if (tipoconta instanceof TipoConta){
            const conexao = await conectar();
            const sql = "UPDATE tipoconta SET descricao = ? WHERE codigo = ?";
            const parametros = [tipoconta.descricao, tipoconta.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(tipoconta){
        if (tipoconta instanceof TipoConta){
            const conexao = await conectar();
            const sql = "DELETE FROM tipoconta WHERE codigo = ?";
            const parametros = [tipoconta.codigo];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        let sql = "";
        let parametros = [];
        if (isNaN(parseInt(termo))) {
            sql = "SELECT * FROM tipoconta WHERE descricao LIKE ? ORDER BY descricao";
            parametros.push("%"+termo+"%");
        }
        else{
            sql = "SELECT * FROM tipoconta WHERE codigo = ? ORDER BY descricao";
            parametros.push(termo);
        }
        const conexao = await conectar();
        
        const [registros, campos] = await conexao.query(sql, parametros);
        await conexao.release();
        let listaTipoContas=[];
        for (const registro of registros){
            const tipoconta = new TipoConta(registro['codigo'],
                                            registro['descricao']    
            );
            listaTipoContas.push(tipoconta);
        }
        
        return listaTipoContas;

    }

}
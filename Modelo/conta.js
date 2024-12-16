import ContaDAO from "../Persistencia/contaDAO.js";
import TipoConta from "./tipoConta.js";

export default class Conta{
    #codigo;
    #email;
    #nome;
    #senha;
    #confsenha;
    #ano;
    #tipoConta

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo=novoCodigo;
    } 

    get email(){
        return this.#email;
    }

    set email(novoemail){
        this.#email = novoemail;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novonome){
        this.#nome = novonome;
    }

    get senha(){
        return this.#senha;
    }

    set senha(novasenha){
        this.#senha = novasenha;
    }

    get confsenha(){
        return this.#confsenha;
    }

    set confsenha(novaconfsenha){
        this.#confsenha = novaconfsenha;
    }

    get ano(){
        return this.#ano;
    }

    set ano(novoano){
        this.#ano = novoano;
    }

    get tipoConta(){
        return this.#tipoConta
    }

    set tipoConta(novotipoConta){
        if (novotipoConta instanceof TipoConta){
            this.#tipoConta = novotipoConta;
        }
    }

    constructor(codigo=0, email="",nome="",senha="",confsenha="",
                ano="", tipoConta={}){
        this.#codigo=codigo;
        this.#email=email;
        this.#nome=nome;
        this.#senha=senha;
        this.#confsenha=confsenha;
        this.#ano=ano;
        this.#tipoConta=tipoConta;
    }

    toJSON(){
        return {
            "codigo":this.#codigo,
            "email":this.#email,
            "nome":this.#nome,
            "senha":this.#senha,
            "confsenha":this.#confsenha,
            "ano":this.#ano,
            "tipoConta":this.#tipoConta
        }
    }

    async incluir(){
        const contDAO = new ContaDAO();
        await contDAO.incluir(this);
    }

    async consultar(termo){
        const contDAO = new ContaDAO();
        return await contDAO.consultar(termo);
    }

    async excluir(){
        const contDAO = new ContaDAO();
        await contDAO.excluir(this);
    }

    async alterar(){
        const contDAO = new ContaDAO();
        await contDAO.alterar(this);
    }
}


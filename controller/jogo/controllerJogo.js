/*******************************************************************************************************************
 * Objetivo : Controller responsável pela regra do negócio do CRUD do jogo
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ******************************************************/

 //Função para inserir um novo jogo
 const inserirJogo = async function(jogo){
    if(
        jogo.nome                    == undefined || jogo.nome == ''                  || jogo.nome            == null   || jogo.nome.length                       > 80 ||
        jogo.data_lancamento         == undefined || jogo.data_lancamento == ''       || jogo.data_lancamento == null   || jogo.data_lancamento.length            > 10 ||
        jogo.versao                  == undefined || jogo.versao == ''                || jogo.versao          == null   || jogo.versao.length                     > 10 ||
        jogo.tamanho                 == undefined || jogo.tamanho.length   > 10       ||
        jogo.descricao               == undefined || 
        jogo.foto_capa               == undefined || jogo.foto_capa.length > 200      ||
        jogo.link                    == undefined || jogo.link.length      > 200          




    ){
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    }else{
        //Encaminha os dados do novo jogo para ser inserido no BD
        let resultJogo = await jogoDAO.insertJogo(jogo)

        if(resultJogo)
            return MESSAGE.SUCCESS_CREATED_ITEM //201
        else
        return MESSAGE.ERROR_INTERNAL_SERVER //500
    }
 }

 //Função para atualizar um jogo
 const atualizarJogo = async function(){
     
}

//Função para excluir um jogo
const excluirJogo = async function(){
     
}

//Função para retornar todos os jogos
const listarJogo = async function(){
     
}

//Função para buscar um jogo
const buscarJogo = async function(){
     
}


module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}
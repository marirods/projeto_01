/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const jogoIdiomasDAO = require('../../model/DAO/jogo_idiomas.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirJogoIdioma = async function(jogoIdiomas, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    jogoIdiomas.id_jogo                 == ''                || jogoIdiomas.id_jogo         == undefined          || jogoIdiomas.id_jogo  == null       || isNaN(jogoIdiomas.id_jogo)        || jogoIdiomas.id_jogo          <=0 ||
                    jogoIdiomas.id_idioma               == ''                || jogoIdiomas.id_idioma       == undefined          || jogoIdiomas.id_idioma == null      || isNaN(jogoIdiomas.id_idioma)      || jogoIdiomas.id_idioma   <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultidiomas = await jogoIdiomasDAO.insertJogoIdioma(jogoIdiomas)

                    if(resultidiomas)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarJogoIdioma = async function(id, jogoIdiomas, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                           == undefined    || id                            == null || isNaN(id)                          || id                          <= 0   ||
                jogoIdiomas.id_jogo                   == ''           || jogoIdiomas.id_jogo          == undefined    || jogoIdiomas.id_jogo         == null || isNaN(jogoIdiomas.id_jogo)       || jogoIdiomas.id_jogo       <=0 ||
                jogoIdiomas.id_idioma                 == ''           || jogoIdiomas.id_idioma        == undefined    || jogoIdiomas.id_idioma    == null || isNaN(jogoIdiomas.id_idioma)  || jogoIdiomas.id_idioma  <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultidiomas = await jogoIdiomasDAO.selectByIdJogoIdioma(parseInt(id))

                    if(resultidiomas != false || typeof(resultidiomas) == 'object'){
                        if(resultidiomas.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            idiomas.id = parseInt(id)

                            let result = await jogoIdiomasDAO.updateJogoIdioma(jogoIdiomas)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirJogoIdioma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultidiomas = await jogoIdiomasDAO.selectByIdJogoIdioma(parseInt(id))

            if(resultidiomas != false || typeof(resultidiomas) == 'object'){
                //Se existir, faremos o delete
                if(resultidiomas.length > 0){
                    //delete
                    let result = await jogoIdiomasDAO.deleteJogoIdioma(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarJogoidioma = async function(){
    try {
        //Objeto do tipo JSON
        let dadosIdiomas = {}
        //Chama a função para retornar os generos cadastrados
        let resultidiomas = await jogoIdiomasDAO.selectAllJogoIdioma()

        if(resultidiomas != false || typeof(resultidiomas) == 'object'){
            if(resultidiomas.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosIdiomas.status = true
                dadosIdiomas.status_code = 200
                dadosIdiomas.items = resultidiomas.length
                dadosIdiomas.idioma = resultidiomas

                return dadosIdiomas
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarJogoIdioma = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosIdiomas = {}

            let resultidiomas = await jogoIdiomasDAO.selectByIdJogoIdioma(parseInt(id))
            
            if(resultidiomas != false || typeof(resultidiomas) == 'object'){
                if(resultidiomas.length > 0){
                     //Criando um JSON de retorno de dados para a API
                     dadosIdiomas.status = true
                     dadosIdiomas.status_code = 200
                     dadosIdiomas.idioma = resultplataformas

                    return dadosIdiomas //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const buscarIdiomaPorJogo = async function(id){
    try {
        const arrayIdiomas = []
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosIdiomas = {}

            let resultidiomas = await jogoIdiomasDAO.selectJogoByIdIdioma(parseInt(id))
            
            if(resultidiomas != false || typeof(resultidiomas) == 'object'){
                if(resultidiomas.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosIdiomas.status = true
                    dadosIdiomas.status_code = 200                    
                    for(item of resultidiomas){
            
                        let dadosEmpresas = await controllerEmpresas.buscarEmpresas(item.id_empresas)
                        item.empresas = dadosEmpresas.empresas
                        
                        delete item.id_empresas
            
                        let dadosFaixaEtaria = await controllerClassificacaoEtaria.buscarClassificacao_Etaria(item.id_faixa_etaria)
                        // console.log(dadosFaixaEtaria);
                        
                        item.FaixaEtaria = dadosFaixaEtaria.faixa_etaria
                        
                        delete item.id_faixa_etaria
            
            
                        arrayIdiomas.push(item)
                    }
                    
                    dadosIdiomas.games = arrayIdiomas
                    dadosIdiomas.idioma = resultidiomas

                    return dadosIdiomas //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}







module.exports = {
    inserirJogoIdioma,
    atualizarJogoIdioma,
    excluirJogoIdioma,
    listarJogoidioma,
    buscarJogoIdioma,
    buscarIdiomaPorJogo
} 
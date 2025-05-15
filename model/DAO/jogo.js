/*******************************************************************************************************************
 * Objetivo : Model responsável pelo CRUD de dados referente a jogos no Banco de Dados
 * Data: 13/02/2025
 * Autor: Marcel
 * Versão: 1.0
 * ********************************/

 //Import da biblioteca do prisma client para executar scripts no BD
 const { PrismaClient } = require('@prisma/client')


 //Instancia da classe do prisma client, para gerar um objeto
 const prisma = new PrismaClient()


 //Função para inserir no Banco de Dados um novo jogo
 const insertJogo = async function(jogo){
    try {

     let sql = `insert into tbl_jogo(
                                        nome,
                                        data_lancamento,
                                        versao,
                                        tamanho, 
                                        descricao,
                                        foto_capa,
                                        link,
                                        id_empresas,
                                        id_faixa_etaria
                                    ) values (
                                        '${jogo.nome}',
                                        '${jogo.data_lancamento}',
                                        '${jogo.versao}',
                                        '${jogo.tamanho}',
                                        '${jogo.descricao}',
                                        '${jogo.foto_capa}',
                                        '${jogo.link}',
                                        '${jogo.id_empresas}',
                                        '${jogo.id_faixa_etaria}'

                                    )`

    //Executa o script SQL no BD e AGUARDA o retorno do BD (insert, update, delete -execute)
    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
        return true
    else
        return false
 }  catch (error) {
    console.log(error)
    return false
}

 }

//Função para atualizar no Banco de Dados um jogo existente 
 const updateJogo = async function(jogo){
    try {
        let sql = `update tbl_jogo set   nome                = '${jogo.nome}',
                                         data_lancamento     = '${jogo.data_lancamento}',
                                         versao              = '${jogo.versao}',
                                         tamanho             = '${jogo.tamanho}', 
                                         descricao           = '${jogo.descricao}',
                                         foto_capa           = '${jogo.foto_capa}', 
                                         link                = '${jogo.link}',
                                         id_empresas         = '${jogo.id_empresas}',
                                         id_faixa_etaria     = '${jogo.id_faixa_etaria}'                
                                    where id = ${jogo.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados um jogo existente
const deleteJogo = async function(idJogo){
    try {
        let sql = `DELETE FROM tbl_jogo WHERE id = ${idJogo}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de jogos
const selectAllJogo = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_jogo order by id desc'

    //Executa o script SQL e aguarda o retorno dos dados (select - query)
    let result = await prisma.$queryRawUnsafe(sql)

    if(result)
        return result
    else
    return false

} catch (error) {
    return false
}

}

//Função para buscar no Banco de Dados um jogo pelo ID
const selectByIdJogo = async function(id){
try {
    let sql = `SELECT * FROM tbl_jogo WHERE id = ${id}`
    console.log(sql);
    
    let result = await prisma.$queryRawUnsafe(sql)

    if(result.length > 0)
        return result
    else
    return false

} catch (error) {
    return false
}

}


module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}

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


 //Função para inserir no Banco de Dados uma nova categoria
 const insertIdiomas = async function(idiomas){
    try {

     let sql = `insert into tbl_idiomas(
                                        idioma,
        
                                    ) values (
                                        '${idiomas.idioma}'
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

//Função para atualizar no Banco de Dados um idioma existente
 const updateIdiomas = async function(idiomas){
    try {
        let sql = `update tbl_idiomas set 
                                         idioma                       = '${idiomas.idioma}'
       
                                                        where id = ${idiomas.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados um idioma existente
const deleteIdiomas = async function(idIdiomas){
    try {
        let sql = `DELETE FROM tbl_idiomas WHERE id_idioma = ${idIdiomas}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de idiomas
const selectAllIdiomas = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_idiomas order by id_idioma desc'

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

//Função para buscar no Banco de Dados um idioma pelo ID
const selectByIdIdiomas = async function(idIdiomas){
try {
    let sql = `SELECT * FROM tbl_idiomas WHERE id_idioma = ${idIdiomas}`
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
    insertIdiomas,
    updateIdiomas,
    deleteIdiomas,
    selectAllIdiomas,
    selectByIdIdiomas
}

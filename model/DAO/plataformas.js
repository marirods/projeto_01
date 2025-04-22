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


 //Função para inserir no Banco de Dados uma nova plataforma
 const insertPlataformas = async function(plataformas){
    try {

     let sql = `insert into tbl_plataformas(
                                        nome,
                                        fabricante,
                                        dispositivo
        
                                    ) values (
                                        '${plataformas.nome}',
                                        '${plataformas.fabricante}',
                                        '${plataformas.dispositivo}'
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

//Função para atualizar no Banco de Dados uma plataforma existente
 const updatePlataformas = async function(plataformas){
    try {
        let sql = `update tbl_plataformas set 
                                         nome                      = '${plataformas.nome}',
                                         dispositivo               = '${plataformas.fabricante}',
                                         dispositivo               = '${plataformas.dispositivo}'             
                                    where id = ${plataformas.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
        return false


    } catch (error) {
        return false
    }

}

//Função para excluir no Banco de Dados uma plataforma existente
const deletePlataformas = async function(idPlataformas){
    try {
        let sql = `DELETE FROM tbl_plataformas WHERE id_plataformas = ${idPlataformas}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

//Função para retornar do Banco de Dados uma lista de plataformas
const selectAllPlataformas = async function(){
try {
    //Script SQL para retornar os dados do BD
    let sql = 'select * from tbl_plataformas order by id_plataformas desc'

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

//Função para buscar no Banco de Dados uma plataforma pelo ID
const selectByIdPlataformas = async function(idPlataformas){
try {
    let sql = `SELECT * FROM tbl_plataformas WHERE id_plataformas = ${idPlataformas}`
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
    insertPlataformas,
    updatePlataformas,
    deletePlataformas,
    selectAllPlataformas,
    selectByIdPlataformas
}

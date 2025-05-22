/*******************************************************************************************************
 * Objetivo: Criar a comunicação com o Banco de Dados para fazer o CRUD de FilmeGeneros
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar um objeto a ser utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir um novo FilmeGenero
const insertJogoPlataformas = async function(JogoPlataformas){
  try {

      let sql = `insert into tbl_jogo_categoria  ( 
                                          id_jogo,
                                          id_plataformas
                                        ) 
                                          values 
                                        (
                                          ${JogoPlataformas.id_jogo},
                                          ${JogoPlataformas.id_plataformas}
                                        )`
      //console.log(sql)

      //Executa o scriptSQL no banco de dados e aguarda o retorno do BD para 
      //saber se deu certo                                  
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar um FilmeGenero existente
const updateJogoPlataformas = async function(JogoPlataformas){
  try {
      let sql = `update tbl_jogo_plataformas set         id_jogo,        = ${JogoPlataformas.id_jogo},
                                                       id_plataformas     = ${JogoPlataformas.id_plataformas}
                                        
                            where id = ${JogoPlataformas.id}                
                            `
      let resultJogoPlataformas = await prisma.$executeRawUnsafe(sql)

      if(resultJogoPlataformas)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoPlataformas = async function(id){
  try {
    let sql = `delete from tbl_jogo_plataformas where id = ${id}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todos os FilmeGeneros existentes
const selectAllJogoPlataformas = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_plataformas order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar um FilmeGenero pelo ID
const selectByIdJogoPlataformas = async function(id){
  try {
    let sql = `select * from tbl_jogo_plataformas where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar os dados do genero filtrando pelo Filme
const selectPlataformasByIdJogo = async function(id_jogo){
  try {
      let sql = `select tbl_plataformas.* from tbl_jogo
                          inner join tbl_jogo_plataformas
                            on tbl_jogo.id = tbl_jogo_plataformas.id
                          inner join tbl_plataformas
                            on tbl_plataformas.id_plataformas =  tbl_jogo_plataformas.id_plataformas
                      where tbl_jogo.id = ${id_jogo}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}

//Função para retornar os dados do filme filtrando pelo Genero
const selectJogoByIdPlataformas = async function(id_plataformas){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_jogo_plataformas
                            on tbl_jogo.id = tbl_jogo_plataformas.id
                          inner join tbl_plataformas
                            on tbl_plataformas.id_plataformas = tbl_jogo_plataformas.id_plataformas
                      where tbl_plataformas.id_plataformas = ${id_plataformas}`

      let result = await prisma.$queryRawUnsafe(sql)

      if (result)
        return result
      else 
        return false
  } catch (error) {
      return false
  }
}




module.exports = {
    insertJogoPlataformas,
    updateJogoPlataformas,
    deleteJogoPlataformas,
    selectAllJogoPlataformas,
    selectByIdJogoPlataformas,
    selectPlataformasByIdJogo,
    selectJogoByIdPlataformas
} 
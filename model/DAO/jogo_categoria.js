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
const insertJogoCategoria = async function(JogoCategoria){
  try {

      let sql = `insert into tbl_jogo_categoria  ( 
                                          id_jogo,
                                          id_categoria
                                        ) 
                                          values 
                                        (
                                          ${JogoCategoria.id_jogo},
                                          ${JogoCategoria.id_categoria}
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
const updateJogoCategoria = async function(JogoCategoria){
  try {
      let sql = `update tbl_jogo_categoria set         id_jogo,        = ${JogoCategoria.id_jogo},
                                                       id_categoria     = ${JogoCategoria.id_categoria}
                                        
                            where id = ${JogoCategoria.id}                
                            `
      let resultJogoCategoria = await prisma.$executeRawUnsafe(sql)

      if(resultJogoCategoria)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}

//Função para excluir um FilmeGenero existente
const deleteJogoCategoria = async function(id){
  try {
    let sql = `delete from tbl_jogo_categoria where id = ${id}`

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
const selectAllJogoCategoria = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_jogo_categoria order by id desc'

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
const selectByIdJogoCategoria = async function(id){
  try {
    let sql = `select * from tbl_jogo_categoria where id = ${id}`

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
const selectCategoriaByIdJogo = async function(id_jogo){
  try {
      let sql = `select tbl_categoria.* from tbl_jogo
                          inner join tbl_jogo_categoria
                            on tbl_jogo.id = tbl_jogo_categoria.id
                          inner join tbl_categoria
                            on tbl_categoria.id_categoria =  tbl_jogo_categoria.id_categoria
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
const selectJogoByIdCategoria = async function(id_categoria){
  try {
      let sql = `select tbl_jogo.* from tbl_jogo 
                          inner join tbl_jogo_categoria
                            on tbl_jogo.id = tbl_jogo_categoria.id
                          inner join tbl_categoria
                            on tbl_categoria.id_categoria = tbl_jogo_categoria.id_categoria
                      where tbl_categoria.id_categoria = ${id_categoria}`

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
    insertJogoCategoria,
    updateJogoCategoria,
    deleteJogoCategoria,
    selectAllJogoCategoria,
    selectByIdJogoCategoria,
    selectCategoriaByIdJogo,
    selectJogoByIdCategoria
} 
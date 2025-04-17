
use db_controle_jogos_bb;

create table tbl_jogo (
id                int not null primary key auto_increment,
nome              varchar(80) not null,
data_lancamento   date not null,
versao            varchar(10) not null,
tamanho           varchar(10), 
descricao         text,
foto_capa         varchar(200),
link              varchar(200)

);

show tables;
desc tbl_idiomas;
select * from tbl_jogo;


create table tbl_empresas (
id_empresas                   int not null primary key auto_increment,
nome                          varchar(100) not null,
segmento                      varchar(20) not null,
pais_origem                   varchar(45) not null


);

create table tbl_usuario (
id_usuario                   int not null primary key auto_increment,
nome                         varchar(100) not null,
email                        varchar(50) not null,
username                     varchar(45) not null

);

create table tbl_plataformas(
id_plataformas                   int not null primary key auto_increment,
nome                             varchar(45) not null,
fabricante                       varchar(45) not null,
dispositivo                      varchar(50) not null

);


create table tbl_classificacao_etaria(
id_faixa_etaria                   int not null primary key auto_increment,
descricao                         varchar(45) not null,
classificacao                     varchar(50) not null

);


create table tbl_categoria(
id_categoria                   int not null primary key auto_increment,
nome                           varchar(50) not null,
genero                         varchar(50) not null

);

create table tbl_idiomas(
id_idioma                       int not null primary key auto_increment,
idioma                          varchar(45) not null

);







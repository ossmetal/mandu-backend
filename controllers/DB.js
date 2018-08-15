"use strict";
var config = require('../config.json');
var pg = require ("pg");
const connectionString = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;
/*------------------QUERYS-----------------------------------------------*/
function casoDeExitoString(id){
 
 return   `
    SELECT array_to_json(array_agg(row_to_json(t)))
        from(
            select c.* from propuesta p
            inner join casos_exito c on c.prop_id = p.id
            where p.id = ${id}
        )t;
`;}
 function imgsString (id){
    return  `
    SELECT array_to_json(array_agg(row_to_json(t)))
    from(
        select i.* from propuesta p
        inner join imgs i on i.prop_id = p.id
        where p.id = ${id}
    )t;
`}

function inversionString (id){
    return  `
    SELECT array_to_json(array_agg(row_to_json(t)))
    from(
	    select i.* from propuesta p
	    inner join inversion i on i.prop_id = p.id
	    where p.id = ${id}
    )t	
`}
/**************** */
class DB{
    constructor(){
        this.pgClient = new pg.Client(connectionString);
        this.pgClient.connect();
    }
    //retorna una promesa del query ejecutado
    executeQuery(query){
        return this.pgClient.query(query);
    }
    //retorna promesa con json de casos de exito
    getCasosDeExito(id){
        return this.pgClient.query(casoDeExitoString(id));
    }
    //retorna promesa con json de imagenes
    getImgs(id){
        return this.pgClient.query(imgsString(id));
    }
    //retorna promesa con json de inversion
    getInversions(id){
        return this.pgClient.query(inversionString(id));
    }
}
module.exports = DB;

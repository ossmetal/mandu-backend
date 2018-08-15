const express = require('express');
const client = express();
const DB = require('./controllers/DB');


client.use(express.static('public'))
var DBClient = new DB();




client.get('/casos-de-exito',(req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    DBClient.getCasosDeExito(1).then(
        result =>{
            const casoExito = result.rows[0].array_to_json;
           res.send(JSON.stringify(casoExito));
        }).catch(e=>{
        })
})

client.get('/imgs',(req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    DBClient.getImgs(1).then(
        result =>{
            const imgs = result.rows[0].array_to_json;
           res.send(JSON.stringify(imgs));
        }).catch(e=>{
        })
})

client.get('/inversions',(req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    DBClient.getInversions(1).then(
        result =>{
            const inversions = result.rows[0].array_to_json;
           res.send(JSON.stringify(inversions));
        }).catch(e=>{
        })
})

client.listen(9000,()=>{})

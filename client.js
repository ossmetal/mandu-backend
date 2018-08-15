const express = require('express');
const client = express();
const DB = require('./controllers/DB');


client.use(express.static('public'))
var DBClient = new DB();

client.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

client.get('/:id',(req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    let response={
        casoExito:[],
        imgs:[],
        inversions:[],
        propuesta:[]
    }
    const blended = req.params.id.split("=");
    const type = blended? blended[0]:'';
    const id =blended?parseInt(blended[1]):-1;
    console.log(id);
    DBClient.getCasosDeExito(id).then(
        result =>{
            response.casoExito = result.rows[0].array_to_json;
            
            DBClient.getImgs(id).then(
                result =>{
                   response.imgs = result.rows[0].array_to_json;
                   
                   DBClient.getInversions(id).then(
                    result =>{
                        response.inversions = result.rows[0].array_to_json;
                        DBClient.getPropuestas(id).then(
                            result =>{
                                response.propuesta = result.rows[0].array_to_json[0];
                                if(response.propuesta.isview==="N"){
                                    if(type === 'c'){
                                        DBClient.setFirstview(response.propuesta.id).then(
                                            result =>{
                                                console.log(result.rows[0].firstview+' '+response.propuesta.valid_days+' Dias');
                                            }
                                        )
                                    }
                                }
                                res.send(JSON.stringify(response));
                            }
                        ).catch(e=>{})
                       //res.send(JSON.stringify(response));
                    }).catch(e=>{
                    })  
                }).catch(e=>{
                })
        }).catch(e=>{
        })
    
})

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

const express = require('express');
const app = express();
const md5 = require('md5');
const DB = require('./controllers/DB');

app.use(express.static('public'))
client.use(express.static('public'))
var DBClient = new DB();
/*
DBClient.getCasosDeExito(1).then(
res =>{
    const casoExito = res.rows[0].array_to_json;
   // console.log(casoExito);
}).catch(e=>{
})

DBClient.getImgs(1).then(
    res =>{
        const imgs = res.rows[0].array_to_json;
        //console.log(imgs);
    }).catch(e=>{
})
DBClient.getImgs(1).then(
    res =>{
        const imgs = res.rows[0].array_to_json;
        console.log(imgs);
    }).catch(e=>{
})

app.use(basicAuth({
    challenge: true,
    authorizer: (user,password)=>{
        console.log(user,password);
        
    },
    authorizeAsync: true,
}))*/

app.use((req, res, next) => {

    // -----------------------------------------------------------------------
    // authentication middleware
  
    const auth = {login: 'admin', password: 'mandu2018!'} // change this
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = new Buffer(b64auth, 'Basic realm="401"').toString().split(':')
  
    // Verify login and password are set and correct
    if (!login || !password || login !== auth.login || password !== auth.password) {
      res.set('WWW-Authenticate', 'Basic') // change this
      res.status(401).send('Authentication required.') // custom message
      return
    }
  
    // -----------------------------------------------------------------------
    // Access granted...
    next()
  
  })


app.post('/set-propuesta',(req,res)=>{

    res.send({status:'ok',id:'sadjakhwus'});


})



app.listen(3001, () => console.log(md5('123456')))


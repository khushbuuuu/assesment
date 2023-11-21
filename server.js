var express= require('express')
var indexRouter= require("./server/router/router.js");
const { auth } = require('express-openid-connect');
require('dotenv').config()
const hbs= require('express-handlebars');
const path= require ('path');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'X43zhA40FHTyiMGO9bSq87Dy9rfif98V',
    issuerBaseURL: 'https://dev-rt02dodcblld8yt3.us.auth0.com'
  };


var app = express()
app.set('views', 'views')
app.set('view engine', 'ejs')
require('./server/database/database')();
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
  extname:'hbs',
  defaultView:'default',
  layoutsDir: path.join(__dirname,'views'),
  partialsDir: path.join(__dirname,'views/partials')
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(auth(config));

app.use('/', indexRouter);
app.listen(3000, ()=>{
    console.log('Express is running on port 3000');
})
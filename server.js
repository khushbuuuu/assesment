const express = require('express')
const app=express();

const hbs= require('express-handlebars');
const path= require ('path');
app.use(express.json());
app.use (express.static(path.join(__dirname,'public')));
require('./server/database/database')();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultView:'default',
    layoutsDir: path.join(__dirname,'views'),
    partialsDir: path.join(__dirname,'views/partials')
}))
app.get('/', (req,res)=>{
   res.render('main')
})

app.use('/', require('./server/router/router'));
app.listen (3000,()=>console.log(`server is started`));
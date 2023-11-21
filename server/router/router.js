var express = require('express')
const route= require ('express').Router()
const store= require('../middleware/multer')
const controller= require('../controller/controller');
route.get('/', controller.home);
route.post('/uploadmultiple', store.array('images', 10), controller.uploads)
module.exports=route;
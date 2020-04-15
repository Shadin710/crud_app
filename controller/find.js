const bodyParser = require('body-parser');
const express =  require('express');
const router =  require('express').Router();
const path = require('path');
const curdUser = require('./../models/UserSchema');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.use(express.static(path.join(__dirname+'./../views')));

module.exports= router;
const bodyParser = require('body-parser');
const express =  require('express');
const router =  require('express').Router();
const path = require('path');
const {check,validationResult} =  require('express-validator');
const curdUser = require('./../models/UserSchema');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.use(express.static(path.join(__dirname+'./../views')));

router.get('/',
    [
        check('username').not().isEmpty().trim().escape(),
        check('age').not().isEmpty().trim().escape()
    ],
    (req,res)=>{
        const error =  validationResult(req);
        if(!error.isEmpty()){
            return res.json({
                status: false,
                message: 'validation error',
                error: error.array()
            });
        }

        curdUser.create(
            {
                username: req.query.username,
                age:req.query.age
            },
            (error,result)=>{
                if(error){
                    return res.json({
                        status:false,
                        message:'Insertion failed',
                        error: error.array()
                    });
                }

                res.send('well done the data has been inserted')
            }
        )
    })

module.exports= router;
const bodyParser = require('body-parser');
const express =  require('express');
const router =  require('express').Router();
const path = require('path');
const curdUser = require('./../models/UserSchema');
const {check,validationResult} =  require('express-validator');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.use(express.static(path.join(__dirname+'./../views')));

router.get('/',
    [
        check('username').not().isEmpty().trim().escape()
    ],
    (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty())
        {
            return res.json({
                status: false,
                message: 'validation error',
                error: error.array()
            });
        }

        //no validation error
        curdUser.findOne({username: req.query.username},(error,result)=>{
            if(error)
            {
                return res.json({
                    status: false,
                    message: 'user not found',
                    error: error.array()
                });
            }

            //user found
            res.send('user found at last');
        })

    });
module.exports= router;
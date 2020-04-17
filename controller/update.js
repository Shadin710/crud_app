const bodyParser = require('body-parser');
const express =  require('express');
const router =  require('express').Router();
const path = require('path');
const {check, validationResult} = require('express-validator'); 
const curdUser = require('./../models/UserSchema');

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
                status :false,
                message: 'validation error in update method',
                error: error.array()
                
            });
        }

        // no validation error
        if(req.query.username)
        {
            curdUser.findOneAndUpdate({username:req.query.username},{age:req.query.age},
            (error,result)=>{
                if(error)
                {
                    return res.json({
                        status: false,
                        message: 'error in updating',
                        error: error.array()
                    })
                }

                if(result)
                {
                    res.send('Updated the result');
                }
                else
                {
                    res.send('Sorry there is no username like that');
                }
            });
        }
        else
        {
            return res.json({
                status: false,
                message: 'No username provided'
            });
        }
    }
)

module.exports= router;
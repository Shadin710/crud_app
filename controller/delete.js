const bodyParser = require('body-parser');
const express =  require('express');
const router =  require('express').Router();
const path = require('path');
const {check, validationResult} =  require('express-validator');
const curdUser = require('./../models/UserSchema');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.use(express.static(path.join(__dirname+'./../views')));
router.get('/',
    [
        check('username').not().isEmpty().trim().escape()
    ],
    (req,res)=>{
        const error =  validationResult(req);
        if(!error.isEmpty())
        {
            return res.json({
                status: false,
                message: 'Validation error',
                error: error.array()
            });
        }

        //No validation error
        curdUser.deleteOne({usename: req.query.usename},
            (error,result)=>{
                if(error)
                {
                    return res.json({
                        status: false,
                        message: 'error at deleting the data',
                        error: error.array()
                    });
                }

                if(result)
                {
                    res.send(" the data has been deleted")
                }
                else
                {
                    res.send(" there is no such data");
                }
            });
    }
)




module.exports= router;
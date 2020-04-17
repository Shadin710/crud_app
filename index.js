require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const cors =  require('cors');
const path = require('path');
const database =  require('./database');
const userController = require('./controller/insert');
const userFind =  require('./controller/find');
const userDelete =  require('./controller/delete');
app.use(express.static(path.join(__dirname,'views')));

app.set('view engine','pug');
app.set ('views','./views');

app.use(morgan('dev'));
app.use(cors());

app.get('/',(req,res)=>{
    res.render('index');
});
app.use('/insert',userController);
app.use('/find',userFind);
app.use('/update',userController);
app.use('/delete',userDelete);

app.listen(port,()=>{
    console.log(`Listening to ${port}.....`);
})

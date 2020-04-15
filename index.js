require('dotenv').config();
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const cors =  require('cors');
const path = require('path');

app.use(express.static(path.join(__dirname,'views')));

app.set('view engine','pug');
app.set ('views','./views');

app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(port,()=>{
    console.log(`Listening to ${port}.....`);
})

const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    age:{
        type: String,
        require: true
    }
});
mongoose.model('crudUser',userSchema);

module.exports = mongoose.model('crudUser');
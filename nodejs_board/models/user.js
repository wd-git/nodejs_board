const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define collection and user schema
let userSchema = new Schema({
    u_id : {
        type : String
    },    
    u_pw : {
        type : String
    },
    u_name : {
        type : String
    }
}, {
    collection: 'users'
});
    module.exports = mongoose.model('user', userSchema)
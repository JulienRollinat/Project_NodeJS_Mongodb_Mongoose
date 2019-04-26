const mongoose = require('mongoose')

       var userShema = new mongoose.Schema({
        firstname : { type : String, default :""},
        lastname : { type : String, default :""},
        email : { type : String, default :""},
        password : { type : String, default :""},
        date : { type : Date, default : Date.now}
    });


exports.addUser = (lastname, firstname, email, password) => {
    var UserMongo = mongoose.model('Users', userShema);
    new UserMongo({firstname,lastname, email, password}).save();
}

exports.connect = async(email, password) => {
    var UserMongo = mongoose.model('Users', userShema);
    return new Promise (resolve => {
        UserMongo.findOne({email,password}).exec(function(err,user){
            resolve(user);
        })
    });
}

exports.hashPassword = (password) => {
    return require('crypto').createHash('sha1').update(password).digest('hex')
}

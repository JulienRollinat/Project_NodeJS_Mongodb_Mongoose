// on utilisera le model user.js
const userModel = require('../models/User.js')

// inscription
exports.signup = (request) => {
   userModel.addUser(
       request.body.lastname,
       request.body.firstname,
       request.body.email,
       // le password sera hashé 
       userModel.hashPassword(request.body.password)
   );
};

// connexion
exports.signin = (request, response) => {
    // la methode connect retourne une promesse    
    var tryConnect = userModel.connect(
        request.body.email,        
        // le password est hashé
        userModel.hashPassword(request.body.password)
    );
    console.log( userModel.hashPassword(request.body.password))
    console.log(request.body.email)
    // quand la promesse aura lieu
    tryConnect.then(function(user) {     
        request.session.connected = true;
        request.session.user = {
            id : user._id,
            lastname : user.lastname,
            firstname : user.firstname,            
        }      
        console.log(request.session.user);              
        response.redirect('/home')
    }, () => {
        request.session.connected = false;
        request.session.user = {};
        //response.redirect('/home')
    }).catch(error =>{ console.log(error);});
    
 };

 // déconnexion
exports.signout = (request, response) => {
    request.session.connected = false;
    request.session.user = {};
    response.redirect('/')
 };
 
 
 
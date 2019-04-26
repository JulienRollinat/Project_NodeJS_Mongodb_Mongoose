const express = require('express');
const app  = express();
const path = require('path');
const session = require('express-session')
const bodyParser = require('body-parser')

//parametrage de body parser
app.use(bodyParser.urlencoded({extended: false}))


// parametrage de express-session
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 6000000000 }}))
app.use((req,res,next) => { res.locals.session = req.session; next();})

//Je mets en static...
app.use(express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/public')));

//Je charge Pug
app.set('view engine', 'pug' )

//routes
app.get('/home', function (req, res) {   
  var message = "Bienvenue à toi ! "; 
  var deconnexion = "";
    if(req.session.user != undefined && req.session.user.lastname != undefined){
      console.log("lastname  ==> " + req.session.user.lastname);
      console.log("firstname  ==> " + req.session.user.firstname);
      message = "Bienvenue à toi " + req.session.user.firstname + " " + req.session.user.lastname + " !";
      deconnexion = true;      
    }
    res.render('home', { message: message, deconnexion : deconnexion });        
  });

app.get('/connexion', function (req, res) {
    res.render('connexion')    
  });

app.get('/createaccount', function (req, res) {
    res.render('createaccount')
  });

 app.post('/user/submit', function (req, res) {    
    var firstname = req.body.firstname;    
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    console.log(firstname + "---" +lastname + "---" + email + "---" + password);
    require('./controllers/account').signup(req);            
    res.redirect("/home");
 });

  app.post('/user/signin', function (req, res) {   
    require('./controllers/account').signin(req, res);       
  });

  // deconnexion
  app.get('/customer/deconnect', (request, response) => {
    // appeler le controller pour connecter l'utilisateur
    require('./controllers/account').signout(request, response);
    res.redirect("/home");
})

//message de confirmation  
console.log("NodeJs tourne...");


//Je suis sur le port 8000
app.listen(3000);
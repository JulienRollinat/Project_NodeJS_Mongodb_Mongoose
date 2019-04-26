const mongoose = require('mongoose');
const express = require('express');
const app = express();

//Connexion à la BDD
mongoose.connect(
	'mongodb+srv://Test:Test@cluster0-lkbtj.mongodb.net/Projetto4NodeJs?retryWrites=true', 
	{useNewUrlParser: true}
)

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
	console.log('Connexion MongoDB réussi');
});

//Chargement de route et app 

require('./routapp.js');


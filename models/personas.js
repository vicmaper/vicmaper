

var mongoose = require('mongoose');

var personaSchema = new mongoose.Schema({
	nombre:String,
	apellido:String,
	telefono:String,
	email:String,
	fecha_nac:{type:Date,default:Date.now},
	usuario:String,
	pas:String
});

mongoose.model('Persona', personaSchema);

// insert de mongo db.Persona.insert({nombre:'luis',apellido:'alonso',telefono:'912313',email:'test@test.com',fecha_nac:'1519928623022'})
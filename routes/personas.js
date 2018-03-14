


var express = require('express');
var router = express.Router();
var	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended:true}));

router.use(methodOverride(function(req, res){
	if (req.body && typeof req.body === 'object'
		&& '_method' in req.body) {
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}))

//select
router.route('/')
	.get(function(req, res){
		mongoose.model('Persona').find({},function(err,personas){
			if (err){
				return console.error(err);
			}
			else{
				res.format({
					html:function(){
						res.render('personas/index',
						{title:'Lista personas','personas':personas
						});
					},
					json:function(){
						res.json(personas);
					}
				});
			}
		});
	});


router.get('/agregar', function(req, res){
	res.render('personas/agregar',{title:"Agregar Persona"});

});
router.post('/guardar',function(req, res){
		var nombre = req.body.nombre;
		var apellido = req.body.apellido;
		var telefono = req.body.telefono;
		var email = req.body.email;
		var fecha_nac = req.body.fecha_nac;
		var usuario = req.body.usuario;
		var pas = req.body.pas;
	
		mongoose.model('Persona').create({
			'nombre': nombre,
			'apellido': apellido,
			'telefono': telefono,
			'email': email,
			'fecha_nac':fecha_nac,
			'usuario':usuario,
			'pas':pas
		},
			function (error, persona){
				if(error)
					res.send("ERror "+"al guardar");
				else{
					console.log();("Dato guardado"
						+ persona);
					res.format({
						html:function (argument) {
							res.location("/personas");
							res.redirect("/personas");
						}
					});
				}
			});
	});





router.get('/editar/:email', function(req, res){
	console.log(req.params.email);
	mongoose.model('Persona').findOne({'email':req.params.email}, function(error, persona){
		if(error)
			console.log("no se encontro");
		else{
			console.log(persona);
			res.format({
				html: function(){
					res.render('personas/editar',{title:"Editar Persona",
						'persona': persona});	
				}
			});
			
		}
	});
});

router.post('/editar',function(req, res){
		var nombre = req.body.nombre;
		var apellido = req.body.apellido;
		var telefono = req.body.telefono;
		var email = req.body.email;
		var fecha_nac = req.body.fecha_nac;

	
		mongoose.model('Persona').update({'email':email},{'nombre':nombre,
			'apellido': apellido,
			'telefono': telefono,
			'email': email,
			'fecha_nac':fecha_nac
		},
			function (error, persona){
				if(error)
					res.send("ERror "+"al EDITAR");
				else{
					console.log();("Dato EDITADO"
						+ persona);
					res.format({
						html:function (argument) {
							res.location("/personas");
							res.redirect("/personas");
						}
					});
				}
			});
	});


router.get('/eliminar/:email', function(req, res){
	console.log(req.params.email);
	mongoose.model('Persona').findOne({'email':req.params.email}, function(error, persona){
		if(error)
			console.log("no se encontro");
		else{
			console.log(persona);
			res.format({
				html: function(){
					res.render('personas/eliminar',{title:"Eliminar Persona",
						'persona': persona});	
				}
			});
			
		}
	});
});

router.post('/eliminar',function(req, res){
		var nombre = req.body.nombre;
		var apellido = req.body.apellido;
		var telefono = req.body.telefono;
		var email = req.body.email;
		var fecha_nac = req.body.fecha_nac;

	
		mongoose.model('Persona').remove({'email':email},
			function (error, persona){
				if(error)
					res.send("ERror "+"al eliminar");
				else{
					console.log();("Dato eliminado"
						+ persona);
					res.format({
						html:function (argument) {
							res.location("/personas");
							res.redirect("/personas");
						}
					});
				}
			});
	});


router.post('/buscar',function(req, res){
		mongoose.model('Persona').find({nombre:req.body.buscar},function(err,personas){
			if (err){
				return console.error(err);
			}
			else{
				res.format({
					html:function(){
						res.render('personas/index',
						{title:'Lista personas','personas':personas
						});
					},
					json:function(){
						res.json(personas);
					}
				});
			}
		});
	});


router.post('/login',function(req, res){
		mongoose.model('Persona').findOne({usuario:req.body.usuario,pas:req.body.pas},function(err,personas){
			if (err){
				return console.error(err);
			}

			else{
				console.log(personas);
				if(personas==null){
						res.format({
					html:function(){
						res.location("/personas");
						res.redirect("/personas");
					},
					json:function(){
						res.json(personas);
					}
				});

				}else{
				res.format({
					html:function(){
						res.render('index',{title:"bienvenido",'personas':personas})
					},
					json:function(){
						res.json(personas);
					}
				});
			}
			}
		});
	});

router.get('/login', function(req, res){
		res.render('personas/login',{title:"Login"});
});

	

module.exports=router;


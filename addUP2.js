var express = require('express');
var mysql  = require('mysql');
var pug = require('pug');
var app = express();
var parse = require("./parseUP");
const multer = require('multer')
var upload = multer().single('file');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'accountisu'
});

app.set('views', './views');
app.set('view engine', 'pug')


connection.connect();
var dirs = [];
app.get('/load', (req, res) => {	
	connection.query("SELECT * FROM directions order by code", function(err, rows, fields) {
		res.render('up', {dirs: rows});
		dirs = rows;
	});	
});



// app.post('/load', upload.single('file'), [], (req, res) => {  
//   if (req.file) {
// 	buff = req.file.buffer;
// 	console.log(buff);
	
	
// 	parse.beforeParse(req.file.buffer, function(res) {
// 					//console.log(res);
// 	});
	
// 	var up;
	
// 	parse.parseUP(req.file.buffer, function(res) {
// 					up = res;
// 	})
				
// 	result = dirs.filter(item => item.code+" "+item.direction==req.body.dir);	
// 	if (result!=undefined)
// 		id = result[0].id;
	
// 	for (var i=0; i< up.length; i++)
// 		connection.query("INSERT INTO dis (year, dir_id, dis, choise, sem, lek, pr, lab, control) VALUES"+
// 			"("+up[i].year+","+id+",'"+up[i].dis+"',"+up[i].choise+","+up[i].sem+",'"+up[i].lek+"','"+up[i].pr+"','"+up[i].lab+"','"+up[i].control+"')", 
// 		function(err, rows, fields) {
// 			if (err) throw err;
// 		});	
// }
 
// });

var buff;
var dir;
app.post('/load/a', (req, res) => {
	upload(req, res, (err)=> {
		if (req.file) {
	 		buff = req.file.buffer;
	 		dir = req.body.dir;
	 	}

	 	var result;

	 	parse.beforeParse(req.file.buffer, function(r) {
  				result = r
 	 	});	
		
		return res.end(result[0].spec +" "+ result[0].year);
	});	
});

app.post('/sub', (req, res) => {
	var up;
	
	parse.parseUP(buff, function(res) {
					up = res;
	})
				
	result = dirs.filter(item => item.code+" "+item.direction==dir);	
	if (result!=undefined)
		id = result[0].id;

	connection.query("DELETE from dis WHERE year="+up[0].year+" AND dir_id="+id)
	for (var i=0; i< up.length; i++) 
		connection.query("INSERT INTO dis (year, dir_id, dis, choise, sem, lek, pr, lab, control) VALUES"+
			"("+up[i].year+","+id+",'"+up[i].dis+"',"+up[i].choise+","+up[i].sem+",'"+up[i].lek+"','"+up[i].pr+"','"+up[i].lab+"','"+up[i].control+"')", 
		function(err, rows, fields) {
			if (err) throw err;
		});	
	res.end("Успешно")
});

app.listen(process.argv[2]);


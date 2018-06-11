'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {Client} = require('pg');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));

var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

var http = require("http");
var options = {
	hostname: 'localhost',
	port: 9200,
	path: '/incidents/liste',
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	}
};





const client = new Client({
	connectionString: 'postgres://fgnwaomo:0h6w5yMkulNqwO6K5G0O4nNHlZbrLtHw@horton.elephantsql.com:5432/fgnwaomo'
});


app.get('/incidents', async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM INCIDENT JOIN personne on idauteur = idpersonne');
		console.log("incidents:  " + result.rows[0].message);
		res.status(200).json(result.rows);
	}
	catch (err) {
		res.status(500).json(err);
	}
});

app.get('/allocations', async (req, res) => {
	try {
		const result = await client.query('SELECT DISTINCT * FROM allocation JOIN personne ON personne.idpersonne = allocation.idpersonne ');
		console.log("incidents:  " + result.rows[0].message);
		res.status(200).json(result.rows);
	}
	catch (err) {
		res.status(500).json(err);
	}
});


/*	Insertion	*/
app.put('/update', async (req, res) => {
	try {
		const upd = 'UPDATE INCIDENT SET ETAT=\'' + req.body.etat + '\' WHERE idincident=\'' + req.body.idincident + '\''
		console.log(upd);
		const result = await client.query(upd);
	}
	catch (err) {
		throw(err);
	}
});


app.get('/chooseUser', async (req, res) => {
	try {
		const result = await client.query('SELECT * FROM personne');
		console.log(result.rows[0].message);
		res.status(200).json(result.rows);
	}
	catch (err) {
		res.status(500).json(err);
	}
});


client
	.connect()
	.then(() => {
		console.log('[' + new Date().toISOString() + '] Connect to Postgres OK ');
		const server = app.listen(process.env.PORT || 3000, () => {
			console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
		});
	})
	.catch(err => {
		console.log(err);
	});

/*
app.post('/allocations', async (req, res) => {
	try {
		var json = req.body;
		console.log("----allocations");
		console.log(json["idincident"]);
		const result = await client.query("SELECT nom, prenom FROM allocation JOIN personne ON personne.idpersonne = allocation.idpersonne WHERE idincident = '"+json["idincident"]+"'");
		res.status(200).json(result.rows);
	}
	catch (err) {
		res.status(500).json(err);
	}
});
*/

app.post('/declaration', async (req, res) => {
	console.log("hello");
	try {
		var json = req.body;

		var query = "INSERT INTO incident " +
			"(titre, description, type, urgence, date, heure, duree, etat, localisation, idAuteur)" +
			" VALUES ('" + json['titre'] + "','" + json['description'] + "', '" + json['categorie'] + "', "
			+ json['urgence'] + ", '" + json['date'] + "', '" + json['heure'] + "', 5, 'Nouveau', '"
			+ json['localisation'] + "', '" + json['idauteur'] + "' )";
		const result = await client.query(query);

		const result2 = await client.query("SELECT idincident FROM INCIDENT WHERE titre = '" + json["titre"] + "' AND description = '" + json["description"] + "'");
		var idincidentcreated = (result2.rows[0].idincident);

		for (let destinataire of json["destinataires"]) {
			var someQuery = "INSERT INTO allocation (idincident, idpersonne) VALUES ('" + idincidentcreated + "', '" + destinataire + "')";
			const resultFinalQuery = await client.query(someQuery);
		}


		var req = http.request(options, function(res) {
			console.log('Status: ' + res.statusCode);
			console.log('Headers: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (body) {
				console.log('Body: ' + body);
			});
		});
		req.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		req.write(JSON.stringify(json));
		req.end();



		res.status(200).json(result.rows);
	}
	catch (err) {
		res.status(500).json(err);
		console.log(err)
	}
});

app.post('/suppression', async (req, res) => {
	try {

		var json = req.body
		console.log(req.body);
		var query2 = "DELETE FROM allocation WHERE idincident = " + json['idincident'];
		var query = "DELETE FROM incident WHERE idincident = " + json['idincident'];
		console.log(query);
		const result2 = await client.query(query2);
		const result = await client.query(query);
		res.status(200).json(result2.rows);

	} catch (err) {
		res.status(500).json(err);
		console.log(err);
	}
});
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


const client = new Client({
    connectionString: 'postgres://fgnwaomo:0h6w5yMkulNqwO6K5G0O4nNHlZbrLtHw@horton.elephantsql.com:5432/fgnwaomo'
});


app.get('/incidents', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM INCIDENT');
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

app.get('/persons', async (req, res) => {
    try {
        const result = await client.query('SELECT nom, prenom FROM PERSONNE');
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json(err);
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

app.post('/declaration', async (req, res) => {
    try {
        var json = req.body


        var query = "INSERT INTO incident " +
            "(titre, description, type, urgence, date, heure, duree, etat, localisation, idAuteur)" +
            " VALUES ('" + json['titre'] + "','" + json['description'] + "', '" + json['categorie'] + "', "
            + json['urgence'] + ", '" + json['date'] + "', '" + json['heure'] + "', 5, 'Nouveau', '"
            + json['localisation'] + "', '" + json['idauteur'] + "' )"

        console.log(query)
        const result = await client.query(query);

        console.log(result);
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
        var query = "DELETE FROM incident WHERE idincident = " + json['idincident']
        console.log(query);
        const result = await client.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
const express = require('express');
const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('LRDB API is listening on port 8080')
});

app.get('/', async (req, res) => {
    res.json({status: 'La Roja de Bruselas API is working correctly.'})
});

app.get('/players', async (req, res) => {

    var output = 
    db.collection("players").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            var players = querySnapshot.docs.map(doc => doc.data());
            res.status(200).json(players);
        });
    });
    return output;
});
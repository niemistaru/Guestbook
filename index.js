
var express = require('express');
var app = express();
//vois olla myös const port = portinnumero;
//Sisällöt public-hakemiston alta
app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.send('This is lovely');
});
app.get('/guestbook', function(req, res) {
    res.send('Huh huh nimittäin ihan mieletön vieraskirja');
});
/*Taru miten tän saa näyttämään sen lomakkeen?*/
app.get('/newmessage', function(req, res) {
    res.send('You have one new message');
});
app.get('/ajaxmessage', function(req, res) {
    res.send('Litti on kingi ja Kluivert on kurko');
});

//Error-setti
app.get("*", function (req, res) {
    res.send("Nyt ei kyllä tällaista löydy ollenkaan", 404);
});

app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

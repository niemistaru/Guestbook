
var express = require('express');
var app = express();
//vois olla myös const port = portinnumero;
//Sisällöt public-hakemiston alta
app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.send('This is lovely');
});

//Siis pitäis olla mut ei viel oo: Serve browser an HTML table from a file

app.get('/guestbook', function(req, res) {

      var data = require(__dirname + '/public/data/data.json');
      var results = '<table class="table-info">';

      //Taru huom., tässä on nyt laitetu Bootstrapin luokat että olis vaaleensinistä, mutta se ei viel näy
      for (var i = 0; i < data.length; i++) {
            results +=
            '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].username + '</td>' +
                '<td>' + data[i].country + '</td>' +
                '<td>' + data[i].date + '</td>' +
                '<td>' + data[i].message + '</td>' +
            '</tr>';

    /*
            '<tr class="table-info">' +
                '<td class="table-info">' + data[i].id + '</td>' +
                '<td class="table-info">' + data[i].username + '</td>' +
                '<td class="table-info">' + data[i].country + '</td>' +
                '<td class="table-info">' + data[i].date + '</td>' +
                '<td class="table-info">' + data[i].message + '</td>' +
            '</tr>';
    */        
      }
      res.send(results);

      //Minä en tiedä, miten bootsrapin saa yhdistettyä tähän. Tai siis ton guestbook.html:n vai tarviiks sitä sit ollenkaan
     //res.sendFile(__dirname + '/public/guestbook.html');
//    res.sendFile(__dirname + '/public');
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

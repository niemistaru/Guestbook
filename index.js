
var express = require('express');
var fs = require('fs');
var app = express();

//Require the module required for using form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


//vois olla myös const port = portinnumero;
//Sisällöt public-hakemiston alta
app.use(express.static('./public'));

//-------------FRONT PAGE-----------------------------------
app.get('/', function(req, res) {
    res.send('This is lovely');
});


//------------GUESTBOOK----------------------------------
//Siis pitäis olla mut ei viel oo: Serve browser an HTML table from a file
//23.3. TARU JÄTÄ TÄÄ HETKEKSI, RAKENNA MUUT JA PALAA SIT TÄHÄN. EHKÄ SE SELVII.

//No täl se pitäis tulla se taulukko?
app.get('/guestbook', function(req, res) {
    res.sendFile(__dirname + '/public/guestbook.html');
});


      var data = require(__dirname + '/public/data/data.json');
      var results = '<table class="table-info">';

      for (var i = 0; i < data.length; i++) {
            results +=
            '<tr>' +
                '<td>' + data[i].id + '</td>' +
                '<td>' + data[i].username + '</td>' +
                '<td>' + data[i].country + '</td>' +
                '<td>' + data[i].date + '</td>' +
                '<td>' + data[i].message + '</td>' +
            '</tr>';

    /* Tässä on noi bootsrapit mukana, mut ei toimi. Huom. myös table-tägissä
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
//TARU TUO RES NYT HERJAA, ETTÄ EI OO MÄÄRITELTY. KEKSI JOTAIN. ONKS AALTOSULKEET OIKEIS KOHDISSA?

     //res.sendFile(__dirname + '/public/guestbook.html');
//    res.sendFile(__dirname + '/public');
//}); no nyt tää halus nää piiloon ku yritin tota guestbook-formia saada

//----------------------NEW MESSAGE-------------------------------------
/*Taru tällä pitäis saada näkymään se lomake*/
app.get('/newmessage', function(req, res) {
    res.sendFile(__dirname + '/public/newmessage.html');
});

//TARU TÄSSÄ ALLA ON NYT VAA SUORAAN PUSHATTU TIETOA, KORJAA SILLEEN ETTÄ LOMAKE U KNOW
// Load the existing data from a file TARVIIKO OLLA TOI DIRNAME?
var data = require(__dirname + '/public/data/data.json');

//Create new JSON object and add it to data
data.push({
    "id": data.length + 1,
    "username": "Mike Patton",
    "country": "Neverland",
    "date": Date(),
    "message": "Pakko joraa"
});
//Convert JSON object to string format
var jsonStr = JSON.stringify(data);

//Write data to a file
fs.writeFile('./public/data/data.json', jsonStr, (err) => {
    if (err) throw err;
    console.log('I did it, I saved it.');
});
    
// lisää tää sit jotenki, kai?    res.send('You have one new message');
//otin pois ku herjas});

//----------------------AJAX--------------------------------------------
app.get('/ajaxmessage', function(req, res) {
    res.send('Litti on kingi ja Kluivert on kurko');
});


//-----------------------ERROR------------------------------------------
//Error-setti
app.get("*", function (req, res) {
    res.send("Nyt ei kyllä tällaista löydy ollenkaan", 404);
});


//-----------------------PORT--------------------------------------------
app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

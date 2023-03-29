
var express = require('express');
var fs = require('fs');
var app = express();

//Require the module required for using form data
var bodyParser = require('body-parser');
const { json } = require('body-parser');
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
      var data = require(__dirname + '/public/data/data.json');

//Parse the results into a variable
      var results = '<table>';

      for (var i = 0; i < data.length; i++) {
            results +=

            /*
            '<tr>' +
                '<th>' + data[i].id + '</th>' +
                '<th>' + data[i].username + '</th>' +
                '<th>' + data[i].country + '</th>' +
                '<th>' + data[i].date + '</th>' +
                '<th>' + data[i].message + '</th>' +
            '</tr>';
*/
    //KOKEILIN TH-TÄGILLÄ YLLE - siitä tuli vain lihavoituna noi kaikki.
            '<tr>' +
                '<th>' + data[i].id + '</td>' +
                '<td>' + data[i].username + '</td>' +
                '<td>' + data[i].country + '</td>' +
                '<td>' + data[i].date + '</td>' +
                '<td>' + data[i].message + '</td>' +
            '</tr>';
    
    }
      
    res.send(results);
    });


//----------------------NEW MESSAGE-------------------------------------
//Serve a fom to the user
app.get('/newmessage', function(req, res) {
    res.sendFile(__dirname + '/public/newmessage.html');
});

//Route for form sending the POST data
app.post('/newmessage', function (req, res) {
// Load the existing data from a file
var data = require(__dirname + '/public/data/data.json');

/*tätäkö ei nyt sitte tässä käytetä hä?
    var data="";
    data += req.body.username + "\n";
    data += req.body.country + "\n";
    data += req.body.message + "\n";
console.log(data);
res.send(data);
})
*/

data.push({
    "id": data.length + 1,
    "username": req.body.username,
    "country": req.body.country,
    "date": new Date(),
    "message": req.body.message
});


//Convert JSON object to string format
var jsonStr = JSON.stringify(data);


//Write data to a file
fs.writeFile('./public/data/data.json', jsonStr, (err) => {
    if (err) throw err;
    console.log('This is the way.');
});
res.send("I have successfully saved your message and the world.");    
});

//----------------------AJAX--------------------------------------------
app.get('/ajaxmessage', function(req, res) {
    res.send('Litti on kingi ja Kluivert on kurko');
});


//-----------------------ERROR------------------------------------------
//Error-setti
app.get("*", function (req, res) {
    res.status(404).send("Nyt ei kyllä tällaista löydy ollenkaan");
});

//-----------------------PORT--------------------------------------------
app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

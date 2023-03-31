
var express = require('express');
var fs = require('fs');
var app = express();

//Require the module required for using form data
var bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Port
const PORT = process.env.PORT || 3000;
//var http = require('http');


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
                '<td>' + data[i].id + '</td>' +
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

//Serve a fom to the user
app.get('/ajaxmessage', function(req, res) {
    res.sendFile(__dirname + '/public/ajaxmessage.html');
});


app.post('/ajaxmessage', function(req, res) {
   //Load the existing data from a file
    var data = require(__dirname + '/public/data/data.json');
    console.log(req.body);
    data.push({
        "id": data.length + 1,
        "username": req.body.username,
        "country": req.body.country,
        "date": new Date(),
        "message": req.body.message
    });
    /*
        var id = data.length + 1;
        var username = req.body.username + "\n";
        var country = req.body.country + "\n";
        var date = Date();
        var message = req.body.message + "\n";
*/
//Convert JSON object to string format
var jsonStr = JSON.stringify(data);


//Parse the results into a variable
     results = '<table>';

    for (var i = 0; i < data.length; i++) {
          results +=
          '<tr>' +
              '<td>' + data[i].id + '</td>' +
              '<td>' + data[i].username + '</td>' +
              '<td>' + data[i].country + '</td>' +
              '<td>' + data[i].date + '</td>' +
              '<td>' + data[i].message + '</td>' +
          '</tr>';
    }

          console.log(results);

    res.send(results);
});
    

//-----------------------ERROR------------------------------------------
//Error-setti
app.get("*", function (req, res) {
    res.status(404).send("Nyt ei kyllä tällaista löydy ollenkaan");
});

//-----------------------PORT--------------------------------------------
app.listen(PORT, function() {
    console.log('Server is listening to port ' + PORT);
});


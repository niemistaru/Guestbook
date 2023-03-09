//GUESTBOOKIN INDEX. IHa vaa jotta muistat

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
})
app.get('/newmessage', function(req, res) {
    res.send('You have one new message');
})
app.get('/ajaxmessage', function(req, res) {
    res.send('Litti on kingi ja Kluivert on kurko');
})

//Aattelin että joku error-setti olis hyvä?
app.get("*", function (req, res) {
    res.send("Can not find the requested page", 404);
});

app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

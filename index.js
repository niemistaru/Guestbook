//GUESTBOOKIN INDEX. IHa vaa jotta muistat

var express = require('express');
var app = express();
//app.use(express.static('tähän se kansion nimi'));

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

app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

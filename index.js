var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('Cowabunga');
});

app.listen(8081, function() {
    console.log('KGB kuuntelee porttia 8081');
});

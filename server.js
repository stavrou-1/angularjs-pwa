var express = require('express'),
       secure = require('ssl-express-www'),
       app = express(),
       http = express.createServer();

app.use(express.static(__dirname));
app.use(secure);
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

http.get('*', function(req, res) {
    if (!req.secure() && req.protocol === 'http') {
        res.redirect('https://' + req.headers.host + req.url);
    }
});

var server = app.listen(process.env.PORT || 3000);
app.listen(server, function() {
    console.log("Node server listening on port");
})
var express = require('express'),
       secure = require('ssl-express-www'),
       app = express();

app.use(express.static(__dirname));
app.use(secure);
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});
var server = app.listen(process.env.PORT || 3000);
app.listen(server, function() {
    console.log("Node server listening on port " + server);
})
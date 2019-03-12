var express = require('express'),
       app = express(),
       bodyParser = require('body-parser'),
       port = process.env.PORT || 8080;

app.enable('trust proxy'); // needed if you're behind a load balancer
// app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

app.use(function(req, res, next) {
    if (req.secure) {
        return next();
    }
    res.redirect('https://' + req.headers.host + req.url);
});

// app.use(function(req, res, next){
//     if(req.header('x-forwarded-proto') !== 'https'){
//         res.redirect('https://' + req.header('host') + req.url);
//     }else{
//         next();
//     }
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))

app.listen(port);
console.log('App listening on port ' + port);

// var server = app.listen(process.env.PORT || 3000);
// app.listen(server, function() {
//     console.log("Node server listening on port");
// });
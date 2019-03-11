var express = require('express'),
       secure = require('ssl-express-www'),
       app = express();

app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendfile('index.html', {root: __dirname })
});

app.use(function(req, res, next) {
    var sslUrl;
    if (process.env.NODE_ENV === "production" && req.headers['x-forwarded-proto'] !== 'https') {
        sslUrl = ['https://angularjs-pwa.herokuapp.com', req.url].join('');
        return res.redirect(sslUrl);
    }
    return next();
})

var server = app.listen(process.env.PORT || 3000);
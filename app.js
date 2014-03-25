var path = require('path');
var express = require('express');
var osc = require('node-osc');

var app = express();
var oscClient = new osc.Client('127.0.0.1', 3334);

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.post('/action/start', function(req, res, next){
  oscClient.send('/action/start', 1);
  res.json({okay:true, action:'start'});
});

app.post('/action/stop', function(req, res, next){
  oscClient.send('/action/stop', 1);
  res.json({okay:true, action:'stop'});
});

var server = app.listen(3333);

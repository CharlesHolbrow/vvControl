#!/usr/bin/env node

var path = require('path');
var express = require('express');
var osc = require('node-osc');

var app = express();
var oscClient = new osc.Client('127.0.0.1', 3334);
var oscServer = new osc.Server('3332', '0.0.0.0');

// Store the state
var state = 'initialized';
var time = '0:00' // sprintf %i:%02i
var actions = {
  '/state': function(msg){
    state = msg[1];
  },
  '/time': function(msg){
    time = msg[1];
  }
};

oscServer.on('message', function(msg, rinfo){
  var action = actions[msg[0]];
  (typeof action === 'function') && action(msg);
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.post('/action/start', function(req, res, next){
  var level = req.body.level;
  var oscArg;
  if      (level === '3') oscArg = 'loud';
  else if (level === '2') oscArg = 'medium';
  else if (level === '1') oscArg = 'soft';
  else console.log('Error: received start request without a level:', req.body);
  oscClient.send('/action/start', oscArg);
  console.log('Start Request:', req.ip, req.body);
  res.json({okay:true, action:'start'});
});

app.post('/action/stop', function(req, res, next){
  oscClient.send('/action/stop', 1);
  console.log('Stop Request: ', req.ip);
  res.json({okay:true, action:'stop'});
});

app.get('/state', function(req, res, next){
  res.json({state:state, time:time});
});

var server = app.listen(3333);

// ping max
setInterval(function(){
  oscClient.send('/active');
}, 500);

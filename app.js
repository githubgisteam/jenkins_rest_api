/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var DelayedResponse = require('http-delayed-response')

/**set port using env variable for server */
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
  console.log('Listening on port %d', server_port);
});
app.timeout = 500000;


//var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@192.168.43.171:8080', crumbIssuer: false });


app.get('/test', (req, response) => {
console.log("hiiii")
  var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@10.77.17.128:8080'});
 console.log("connection is here",jenkins )
 jenkins.queue.list(function(err, data) {
  if (err) throw err;
 
  console.log('queues', data);
});


})





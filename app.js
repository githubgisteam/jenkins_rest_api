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

/**set port using env variable for server */
var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
  console.log('Listening on port %d', server_port);
});
app.timeout = 500000;

var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@10.75.65.182:8080', crumbIssuer: true });
//var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@192.168.43.171:8080', crumbIssuer: false });



app.get('/test', checkUserAuth, findApp, renderView, sendJSON);

function checkUserAuth(req, res, next) {
  if (req.session.user) return next();
  return next(new NotAuthorizedError());
}
console.log("Display name ", req.body.queryResult.intent.displayName);




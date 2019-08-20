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


//var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@192.168.43.171:8080', crumbIssuer: false });


/*app.use('/test', (req, response) => {

  console.log("Display name ", req.body.queryResult.intent.displayName);
  console.log("here");

  var jobname = (req.body.queryResult.parameters.jobname).toString();
  console.log("jobname", jobname)
  var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@10.77.17.128:8080'});
  jenkins.job.enable(jobname, function (err, result) {
    console.log("jobname 1", jobname)
    response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
    if (err) {
      console.log("error", err)
    } else {
      response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
    }
  })


})*/




app.use(function (req, res) {
  var delayed = new DelayedResponse(req, res);
 
  delayed.on('done', function (results) {
    var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@10.77.17.128:8080'});
    jenkins.job.enable(jobname, function (err, result) {
      console.log("jobname 1", jobname)
      response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
      if (err) {
        console.log("error", err)
      } else {
        response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
      }
    })
    res.json(results);
  }).on('cancel', function () {
    // slowFunction failed to invoke its callback within 5 seconds
    // response has been set to HTTP 202
    res.write('sorry, this will take longer than expected...');
    res.end();
  });
 
  slowFunction(delayed.wait(5000));
});






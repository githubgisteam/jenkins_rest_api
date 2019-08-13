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

/**pass incoming webhook to send messege to slack from azure */
var MY_SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

var jenkins = require('jenkins')({ baseUrl: 'http://amrita:amrita123@10.77.17.170:8080', crumbIssuer: true });

app.post('/test', (req, response) => {
  console.log("Display name ", req.body.queryResult.intent.displayName);
  switch (req.body.queryResult.intent.displayName) {
    case "enablejob":
      var jobname = (req.body.queryResult.parameters.jobname).toString();
      jenkins.job.enable(jobname, function (err, result) {
        if (err) {
          console.log("error", err)
        } else {
          response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
        }

      });
      break;
    case "buildstatus":
      var buildNumber = (req.body.queryResult.parameters.buildnumber).toString();
      var jobname = (req.body.queryResult.parameters.jobname).toString();;
      jenkins.build.get(jobname, buildNumber, function (err, data) {
        if (err) throw err;
        console.log('build', data);
        response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
      });
      break;
    case "enablejob":
      var jobname = (req.body.queryResult.parameters.jobname).toString();
      jenkins.job.enable(jobname, function (err,result) {
        if (err) {
          console.log("Error", err)
        } else{
          console.log("hiii", jobenabled)
        response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
      }
      });
      break;
    case "disablejob":
      var jobname = (req.body.queryResult.parameters.jobname).toString();
      jenkins.job.disable(jobname, function (err, result) {
        if (err) {
          console.log("Error", err)
        } else {
          response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
        }
        
      });
      break;
    case "jobexist":
      var jobname = (req.body.queryResult.parameters.jobname).toString();
      jenkins.job.disable(jobname, function (err, result) {
        if (err) {
         console.log("Error", err);
        } else { 
          response.send(JSON.stringify({ "fulfillmentText": "Job Enabled " }));
        };
      });
      break;
      case "createjob":
        jenkins.job.copy('Test', 'example', function(err) {
          if (err) {
         console.log("Error",err )
          }else{
            console.log("hiii") 
          }
        });
        break;
  }

})


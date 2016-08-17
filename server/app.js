const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const api = require('./controllers/api/api');
const mongoose = require('mongoose');
const dbConnection = require('./config/mongodb-connection')();
const mapOrderObject = require('./mappers/mainObjectMapper.icefresh');
const cronJob = require('cron').CronJob;
const scheduledJobs = require('./utils/cronjobs');

new cronJob('00 00 23 * * *',()=>{
  scheduledJobs.runScheduledJobs();
},null,true,'Asia/Colombo');

app.use('/', express.static('public'));
app.use('/api', api);

app.listen(port, function() {
  console.log('server running on port %s', port);
});

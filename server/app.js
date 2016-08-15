const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const api = require('./controllers/api/api');
const mongoose = require('mongoose');
const orderSchema = require('./models/order.model');
const dbConnection = require('./config/mongodb-connection')();

// pass the order objects as required to models to query the DB
let order = mongoose.model('order',orderSchema);

app.use('/', express.static('public'));
app.use('/api', api);

app.listen(port, function() {
  console.log('server running on port %s', port);
});

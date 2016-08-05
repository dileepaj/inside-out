const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const api = require('./controllers/api');

app.use('/', express.static('public'));
app.use('/api', api);

app.listen(port, function() {
  console.log('server running on port %s', port);
});

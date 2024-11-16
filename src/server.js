const express = require('express');

const router = require('./router');

const webserver = express();

webserver.use(express.json());

webserver.use('/', router);

const PORT = process.env.NODE_ENV === 'development' ? 3050 : 7780;

webserver.listen(PORT, () => {
  console.log('web server running on port ' + PORT);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('./router');
const sequelize = require('./shared/config/db');

const webserver = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

webserver.use(cors(corsOptions));
webserver.use(express.json());

webserver.use('/', router);

const PORT = process.env.NODE_ENV === 'development' ? 3050 : 7780;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to DB success');

    return sequelize.sync();
  })
  .then(() => {
    webserver.listen(PORT, () => {
      console.log('Web server running on port ' + PORT);
    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });

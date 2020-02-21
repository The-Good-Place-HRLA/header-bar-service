let type = 'cluster'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router.js');
const path = require('path');
const redis = require('redis');


class Worker {
  constructor () {
    this.webserver()
  }

  webserver () {
    const app = express();
const port = 4001;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`\u001b[1;34mServer listening on port ${port}\u001B[37m`));
  }
}

module.exports = Worker
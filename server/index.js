// require('newrelic');
// var cluster = require('cluster');

// if(cluster.isMaster) {
//      // Count the machine's CPUs
//      var cpuCount = require('os').cpus().length;
//      console.log('Master cluster setting up ' + cpuCount + ' workers...');

//      // Create a worker for each CPU
//      for (var i = 0; i < cpuCount; i += 1) {
//          cluster.fork();
//      }

//      cluster.on('online', function(worker) {
//         console.log('Worker ' + worker.process.pid + ' is online');
//     });

//      cluster.on('exit', function (worker) {

//         // Replace the dead worker,
//         // we're not sentimental
//         console.log('Worker %d died :(', worker.id);
//         cluster.fork();
    
//     });

// } else {
// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');
// const router = require('./router.js');
// const path = require('path');


// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(morgan('dev'));
// app.use(cors());
// app.use('/api', router);
// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.listen(port, () => console.log(`\u001b[1;34mServer listening on port ${port}\u001B[37m`));

// }
// Listen for dying workers


const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router.js');
const path = require('path');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());
app.use('/api', router);


app.listen(port, () => console.log(`\u001b[1;34mServer listening on port ${port}\u001B[37m`));

const React = require('react');

import {renderToString} from 'react-dom/server';
import App from '../client/src/components/App.jsx';


app.get("/", (req,res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" type="text/css" href="style.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed&display=swap" rel="stylesheet">
      <title>Document</title>
    </head>
    <body>
      <div id="header">${renderToString(<App/>)}</div>
      <div class="AJmegasprite AJbandannaicon"></div>
      <script src="bundle.main.js"></script>
    </body>
    </html>
    `)
})
app.use(express.static(path.join(__dirname, '../client/dist')));
// console.log('hi',path.join(__dirname, '../client/dist'));






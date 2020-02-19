require('newrelic');
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
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`\u001b[1;34mServer listening on port ${port}\u001B[37m`));




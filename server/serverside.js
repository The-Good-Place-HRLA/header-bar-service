// const app = require('./index')
// const React = require('react');

// import {renderToString} from 'react-dom/server';
// import App from '../client/src/components/app.jsx';

app.all("*", (req,res) => {
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
      
    </body>
    </html>
    `)
})
//npm modules
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

// create the server
const app = express();


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))  //tell express about static directory for putting static files like css and javascript



//Homepage route
app.get('/', (req,res) => {
    res.send('You just hit the home page')
})

// tell the server what port to listen on
app.listen(5000, () => {
  debug(`Listening on port: ${chalk.green('5000')}`);
});
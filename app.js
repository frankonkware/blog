// npm modules
const express = require('express');
const chalk = require('chalk'); // for color coding different logs for easier analysis
const debug = require('debug')('app');
const morgan = require('morgan'); // for logging requests to server
const path = require('path'); // for static dir name

// create the server
const app = express();
const port = process.env.PORT || 5000;
const singleRouter = express.Router();


app.use(morgan('tiny')); // tiny will log minimum logs
app.use(express.static(path.join(__dirname, '/public/'))); // tell express about static directory for putting static files like css and javascript
app.set('views', './src/views'); // Set Views Directory
app.set('view engine', 'ejs');

// Route for single page view
singleRouter.route('/')
  .get((req, res) => {
    res.render('single',
      {
        title: 'Env Blog: View blog'
      });
  });
app.use('/single', singleRouter);

// Homepage route
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Env Blog'
    });
});

// tell the server what port to listen on
app.listen(port, () => {
  debug(`Listening on port: ${chalk.green(port)}`);
});

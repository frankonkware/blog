//npm modules
const express = require('express');

// create the server
const app = express();

//Homepage route
app.get('/', (req,res) => {
    res.send('You just hit the home page')
})

// tell the server what port to listen on
app.listen(5000, () => {
  console.log('Listening on localhost:3000')
})
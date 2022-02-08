const express = require("express");
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path')

const taxaRouter = require('./server/routes/taxa-routes');
// const adminRouter = require('./server/routes/admin-route');


const PORT = process.env.PORT || 4001

const app = express()
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {origin: "*"}
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
})

app.use(express.static(__dirname + '/build'))
app.use(express.static(__dirname + '/_storage'))
app.use(express.static(__dirname + '/public'))
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/taxa', taxaRouter);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// app.use(express.static('client/build'));


// Start express app
server.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})


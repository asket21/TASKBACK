const express = require("express"),
bodyParser = require("body-parser");
const session = require('express-session');
const apiRouter = require('./routes/apiRouter');
const path = require('path');
const sequelize = require("./db//db");
const createTables = require("./db/setup");
const pageRouter = require('./routes/page');

const app = express();

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

const PORT = process.env.PORT || 5005;

sequelize.sync();

async function initilizeAPP() {
  try {
    await createTables(sequelize);
    app.listen(PORT, () => {
      console.log("Server is running on port, http://localhost:" + PORT);
    });

    app;
  } catch (error) {
    console.error("Error initilizing app", error.massage);
  }
}


app.use(
  urlencodedParser,
  express.json(),
  express.json({ limit: '5mb' }),
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }),  
  pageRouter,
  apiRouter,
  express.static(path.join(__dirname, 'public')));
// app.listen(PORT)

initilizeAPP();

// const users = []
// //GET
// app.get('/', (req,res) => {

// res.send('Hello world!')

// })

// app.get('/greet/:name', (req,res) => {

//     res.send('Hello ' + req.params.name + '!')

//     })

// app.get('/users', (req, res) => {

//     res.send(users)

// })

// //POST

// app.post('/users/add', (req,res) => {

//     if(!req.body) return res.sendStatus(400)

//     const userName = req.body.name
//     const userEmail = req.body.email
//     const user = {name: userName, email: userEmail}
//     console.log(user)
//     users.push(user)
//     res.send(user)
// })

// app.post('/users/addbyparams', (req,res) => {

//     if(!req.params) return res.sendStatus(400)
//     res.send(req.params)
//     const user = {name: req.body.name, email: req.body.email, age: req.body.age, address: req.body.address}
//     users.push(user)
//     res.send(user)

// })

// app.listen(PORT, () => {
//     console.log('Server is running on port ${PORT}')
// })

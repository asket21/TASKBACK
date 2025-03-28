const express = require("express"),
  app = express();
bodyParser = require("body-parser");

const createTables = require("./db/setup");
const pool = require("./db/index");

const userRouter = require("./routes/userRouter");
const objectRouter = require("./routes/objectRouter");

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

const PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api", urlencodedParser, objectRouter);

app.use("/api", urlencodedParser, userRouter);

async function initilizeAPP() {
  try {
    await createTables(pool);
    app.listen(PORT, () => {
      console.log("Server is running on port," + PORT);
    });

    app;
  } catch (error) {
    console.error("Error initilizing app", error.massage);
  }
}

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

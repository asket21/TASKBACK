
const express = require('express')

const createTables = require('./db/setup')
const pool = require('./db/index')

const userRouter = require('./Routes/userRouter')

const app = express()


const PORT = process.env.PORT || 5004


app.use(express.json())
app.use('/api', userRouter)


async function initilizeAPP() {

    try {

        await createTables(pool);
        app.listen(PORT, () => {
            console.log('Server is running on port,' + PORT)
        })

app

    } catch (error) {

        console.error('Error initilizing app', error.massage);

    }
}


initilizeAPP()






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



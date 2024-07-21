const express = require('express');
const app = express();
const cors = require('cors'); 
const PORT = 8080;

const {connectToMongoDB} =  require('./connection');
const {User} = require('./model/user')
const userRouter = require('./routes/busybuy')

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

//connection
connectToMongoDB('mongodb://localhost:27017/busy-buy-app')
.then(()=>console.log("connect to mongodb  ..!"))
.catch((err)=> console.log('failed to connect mongodb'));

// connectToMongoDB('mongodb://localhost:27017/busy-buy-app')
//     .then(() => {
//         console.log("Connected to MongoDB ..!");

//         // Insert a sample user to create the collection
//         const sampleUser = new User({
//             name: 'John Doe',
//             username: 'johndoe',
//             password: 'password123',
//             cart: [],
//             myOrder: []
//         });

//         sampleUser.save()
//             .then(() => console.log("Sample user inserted and collection created"))
//             .catch(err => console.log("Failed to insert sample user", err));
//     })
//     .catch((err) => console.log('Failed to connect to MongoDB', err));




//Routes
app.use('/busybuy', userRouter)

app.listen(PORT , ()=> console.log(`port started at PORT : ${PORT}`));

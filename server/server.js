
const express = require('express')
const connectDB = require('./config/db')
//const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();

//connect db
connectDB();

//init middleware
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(cookieParser())

app.get('/', (req,res) => {
    res.send('welcome to facebook')
})


//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/post', require('./routes/post'))
app.use('/api/profile', require('./routes/profile'))
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server is running at ${PORT}`))


/* 
{
pallishree@gmail.com
pallishree1@gmail.com
sachin@gmail.com
passwords
123456

} */
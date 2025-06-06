const express = require('express')
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();
const connectToDB = require('./config/db')
connectToDB()
const cookieparser = require('cookie-parser')
const app = express()
const indexRoutes = require('./routes/index.routes')

const userRoutes = require('./routes/user.routes');

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/',indexRoutes);
app.use('/user',userRoutes);


module.exports = app;
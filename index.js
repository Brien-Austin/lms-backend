const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { db } = require('./config/database');
const adminRoutes = require('./routes/admin/adminRoutes')
const userRoutes = require('./routes/user/userRoutes')
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/admin',adminRoutes)
app.use('/api/auth',userRoutes)

app.listen(process.env.PORT, ()=>{
    db();
    
    
    console.log(`Listening on PORT : ${process.env.PORT}`)
})
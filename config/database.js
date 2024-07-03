const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

exports.db = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database Connected')
        
    } catch (error) {
        console.log('[DATABASE_CONNECTION_ERROR]', error)
        console.log(error.message)
        
    }
}
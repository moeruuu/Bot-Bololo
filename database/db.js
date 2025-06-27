const mongoose = require('mongoose')

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            dbName: 'Bot_Discord'
        })
        console.log("Connect oke!");
        
    } catch (error) {
        console.log(`Error connect: ${error}`);
        
    }
}

const mongoose = require('mongoose')
function connectToDB () {
    
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.log(err);  
    })

}
module.exports = connectToDB;
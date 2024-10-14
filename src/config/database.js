const mongoose = require('mongoose');

const databaseConnection = async ()=>{
    await mongoose.connect('mongodb+srv://FrugalShubham:189251Sp%40@namestenode.qzyni.mongodb.net/devTinder')
}



module.exports={
    databaseConnection,
}
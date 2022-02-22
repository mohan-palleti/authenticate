const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    //"mongodb+srv://mohan:mongo_123@cluster0.8wdgb.mongodb.net/authentication?retryWrites=true&w=majority"
    "mongodb://mohan:mongo_123@cluster0-shard-00-00.8wdgb.mongodb.net:27017,cluster0-shard-00-01.8wdgb.mongodb.net:27017,cluster0-shard-00-02.8wdgb.mongodb.net:27017/authentication?ssl=true&replicaSet=atlas-9cuzcc-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
};

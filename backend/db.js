const mongoose = require('mongoose');

//const mongoURI = "mongodb+srv://landagevijay781:landagevijay781@cluster0.mdm8xxh.mongodb.net/MyFoodMERN?retryWrites=true&w=majority"
const mongoURI = "mongodb://landagevijay781:landagevijay781@ac-5jjvnmv-shard-00-00.mdm8xxh.mongodb.net:27017,ac-5jjvnmv-shard-00-01.mdm8xxh.mongodb.net:27017,ac-5jjvnmv-shard-00-02.mdm8xxh.mongodb.net:27017/MyFoodMERN?ssl=true&replicaSet=atlas-ee5xml-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err)
      console.log("---", err);
    else {
      console.log("Connected Successfully");

      //to send food item from backend 
      const fetched_data = await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function (err, data) {
        //to send foodCategory from backend 
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err)
            console.log(err);
          else {
            global.food_items = data; //declare global inorder to user everywhere in application
            global.foodCategory = catData;
          }
        });
        // if (err) console.log(err);
        // else {
        //   global.food_items = data;
        // }
      });
    }
  });
}

module.exports = mongoDB;
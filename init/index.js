const mongoose=require("mongoose");
const sampleData=require("./data");
const Listings=require("../modles/listings");

main().then(()=>{
    console.log("successfuly connected to db");


}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  
}

let initDb=async()=>{
    await Listings.deleteMany({});
    await Listings.insertMany(sampleData.data);
    console.log("data was initialized");

};

initDb();








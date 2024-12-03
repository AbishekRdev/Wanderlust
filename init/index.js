const mongoose=require("mongoose");
const sampleData=require("./data");
const axios=require("axios");
const Listings=require("../modles/listings");
const { geocoding } = require("@maptiler/client");

main().then(()=>{
    console.log("successfuly connected to db");


}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  
}

const initDb=async()=>{
    await Listings.deleteMany({});
    sampleData.data=sampleData.data.map((obj)=>({...obj,owner:"6741601dfe53a2e579900f6c"}));
    await Listings.insertMany(sampleData.data);
    console.log("data was initialized");
};

initDb();



//  geo
    // let allListings= await Listings.find({})


    // for( let listing of allListings){
    //   let place=listing.location;
    //   const response = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json`, {
    //       params: {
    //           key:api_key,  
    //           limit: 1 
    //       }
    //   });
    //   listing.geometry=response.data.features[0].geometry;
    //   let savedlisting=await listing.save();
    //   console.log(savedlisting);


  


    // };
   





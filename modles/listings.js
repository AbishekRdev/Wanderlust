const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./reviews.js");

const listingSchema=new Schema({

    title:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
       
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=>v==="" ? "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    }]

});

listingSchema.post("findOneAndDelete",async(listings)=>{

    if(listings){
        await Review.deleteMany({_id: {$in:listings.reviews}})
    }

    
    
});




const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
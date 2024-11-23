const mongoose=require("mongoose");
const {Schema}=mongoose;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({

   username:{
    type:String,
    required,
    
   }
});

userSchema.plugin(passportLocalMongoose);











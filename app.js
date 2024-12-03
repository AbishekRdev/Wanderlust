if(process.env.NODE_ENV!="production"){
  require('dotenv').config();
};



const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");


const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./modles/user.js");


const ListingsRoute=require("./routes/listings.js");
const ReviewsRoute=require("./routes/reviews.js");
const UserRoute=require("./routes/user.js");


const dbUrl=process.env.ATLASTDB_URL;
const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,

})

store.on("error",()=>{
  console.log("error in mongo session store",err);
});



const sessionOption={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,

  },

};




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



const mongoose=require("mongoose");




main().then(()=>{
    console.log("successfuly connected to db");


}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);

  
}
//home route


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());








app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.curUser=req.user;
  next();
});





app.use("/listings",ListingsRoute);
app.use("/listings/:id/reviews",ReviewsRoute);
app.use("/",UserRoute);










app.get("/",(req,res)=>{
  res.render("listings/homelanding.ejs")

});

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));

})

//error handler
app.use((err,req,res,next)=>{
  let{ status=500,message="some error"}=err;
  res.status(status).render("listings/error.ejs",{message});
});





app.listen(8080,()=>{
  console.log("connection successful");    
});















 







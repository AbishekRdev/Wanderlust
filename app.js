
const express=require("express");
const app=express();
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const ListingsRoute=require("./routes/listings.js");
const ReviewsRoute=require("./routes/reviews.js");
const session=require("express-session");
const flash=require("connect-flash");
const sessionOption={

  secret:"codecode",
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
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  
}
//home route
app.get("/",(req,res)=>{
  res.send("home route");
})

app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next();
});





app.use("/listings",ListingsRoute);

app.use("/listings/:id/reviews",ReviewsRoute);












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















 









const express=require("express");
const app=express();
const port=3000;
const session=require("express-session");
const path=require("path");
const flash=require("connect-flash");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));







const sessionOption=({
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
    

});

app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("sucess");
    res.locals.error=req.flash("error");
    next();

});


app.get("/home",(req,res)=>{
    
    
})
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;

    if(req.session.name==="anonymous"){

        req.flash("error"," registered unsuccessfuly");

    }else{

        req.flash("sucess"," registered successfuly");

    }

   res.redirect("/greet");
 
   
    
});

app.get("/greet",(req,res)=>{

    res.render("home.ejs",{name:req.session.name});

});



app.listen(port,()=>{
    console.log("server listening to port 3030");
});


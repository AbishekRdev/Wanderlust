
const User=require("../modles/user.js");



module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup=async(req,res)=>{

    try{
       let {username,email,password}=req.body;
       let newUser= new User({username,email});
       const registeredUser= await User.register(newUser,password);
       req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings"); 
       });
    
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/listings");
    }

};

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};


module.exports.login=(req,res)=>{

    
    
    req.flash("success","welcome back to Wanderlust You are logged in !!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
    
    

};

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","successfully logged out !");
        res.redirect("/listings");
    });
};
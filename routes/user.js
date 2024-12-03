const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport=require("passport");
const { saveRedirectUrl} = require("../middleware.js");
const userController=require("../controller/user.js");

//signUp
router
.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));




//login
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
userController.login,
);


//logout
router.get("/logout",userController.logout);

module.exports=router
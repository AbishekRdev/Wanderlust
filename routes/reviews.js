const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");
const reviewController=require("../controller/review.js");



const validateReview=(req,res,next)=>{

    const error=reviewSchema.validate(req.body);
    if(error.error){
      console.log(error);
      throw new ExpressError(400,error.error);
    }else{
      next();
    };
  }






//post reviews route
router.post("/",
isLoggedIn,
validateReview,
wrapAsync(reviewController.updateReview));




//delete reviews route
router.delete("/:reviewId",
isLoggedIn,
isAuthor,
wrapAsync(reviewController.destroyReview));







module.exports=router;
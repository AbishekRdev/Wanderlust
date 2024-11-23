const express = require("express");
const router = express.Router({mergeParams:true});
const Listings=require("../modles/listings.js");
const Review=require("../modles/reviews.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js");



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
validateReview,
wrapAsync(async(req,res)=>{
  let listing= await Listings.findById(req.params.id);
  let newReview= new Review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("review saved ");
  req.flash("success","new Review Created!");
  res.redirect(`/listings/${listing.id}`);
}));

//delete reviews route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params;
  await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted");
  res.redirect(`/listings/${id}`);

}));







module.exports=router;
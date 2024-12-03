const Review=require("../modles/reviews.js");
const Listings=require("../modles/listings.js");



module.exports.updateReview=async(req,res)=>{
    let listing= await Listings.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("review saved ");
    req.flash("success","new Review Created!");
    res.redirect(`/listings/${listing.id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
};
const Listings=require("./modles/listings.js");
const {listingSchema }=require("./schema.js");
const Review=require("./modles/reviews.js");
const ExpressError = require('./utils/ExpressError');




module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error"," you must log to create new listing");
        return res.redirect("/login");
      }
    next();
    
};


module.exports.saveRedirectUrl=(req,res,next)=>{

  if(req.session.redirectUrl){

    res.locals.redirectUrl=req.session.redirectUrl;

  };
  next();

};


module.exports.validateListings=(req,res,next)=>{

  const {error}=listingSchema.validate(req.body);
  if(error){
    let errorMsg= error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errorMsg);
  }else{
    next();
  };
}

module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params;
    let listing= await Listings.findById(id);
    if(!listing.owner._id.equals(res.locals.curUser._id)){
        req.flash("error"," you are not the owner of this Listing");
        return res.redirect(`/listings/${id}`);
    };
    next();

};


module.exports.isAuthor= async (req,res,next)=>{
  let {id, reviewId} = req.params;
  let review= await Review.findById(reviewId);
  if(!review.author.equals(res.locals.curUser._id)){
      req.flash("error"," you are not the Author of this Listing");
      return res.redirect(`/listings/${id}`);
  };
  next();

};


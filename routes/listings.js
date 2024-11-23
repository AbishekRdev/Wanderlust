const express = require("express");
const router = express.Router();
const Listings=require("../modles/listings.js");
const wrapAsync=require("../utils/wrapAsync");
const {listingSchema }=require("../schema.js");



const validateListings=(req,res,next)=>{

    const error=listingSchema.validate(req.body);
    if(error.error){
      console.log(error);
      throw new ExpressError(400,error.error);
    }else{
      next();
    };
  }

// index
router.get("/", wrapAsync(async (req, res) => {
    let allListings = await Listings.find({});
    res.render("listings/index.ejs", { allListings });
}));

// new route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// create route
router.post("/",
    validateListings,
    wrapAsync(async (req, res) => {
        let listings = req.body.listings;
        let newListings = await Listings.insertMany(listings);
        req.flash("success","new Listing created");
        res.redirect("/listings");
    })
);

// show
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findById(id).populate("reviews");
    if(!listing){

        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
        
    }
    res.render("listings/show.ejs", { listing });
}));

// edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    if(!listing){

        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
        
    }
    res.render("listings/edit.ejs", { listing });
}));

// update route
router.put("/:id",
    validateListings,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        await Listings.findByIdAndUpdate(id, { ...req.body.listings });
        req.flash("success","Listing updated");
        res.redirect(`/listings/${id}`);
    })
);

// delete
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listings.findByIdAndDelete(id);
    req.flash("success"," Listing  deleted");
    res.redirect("/listings");
}));


module.exports=router;
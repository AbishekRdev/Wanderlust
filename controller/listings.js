const Listings=require("../modles/listings.js");
const axios = require("axios");
const ExpressError = require("../utils/ExpressError.js");



module.exports.index= async (req, res) => {
    let allListings = await Listings.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm= (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.createListing=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    let newListings = new Listings(req.body.listings);
    newListings.owner=req.user._id;
    newListings.image={url,filename};

    let place=newListings.location;
    const response = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json`, {
        params: {
            key: process.env.MAP_API_KEY,  
            limit: 1 
        }
    });


    const features = response.data.features;
    if (!features || features.length === 0 || !features[0].geometry) {
        req.flash("error","Location not found Try Again!");
       return res.redirect("/listings/new");
    }

  
    newListings.geometry=response.data.features[0].geometry;
    let savedListing= await newListings.save();
    req.flash("success","new Listing created");
    res.redirect("/listings");
    
};

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findById(id)
    .populate({
        path:"reviews",
        populate:{path:"author",},
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    };

    // let averageRating = 0;
    // if (listing.reviews.length > 0) {
    //     let totalRating = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
    //     averageRating = (totalRating / listing.reviews.length).toFixed(1);
    // }
  

    res.render("listings/show.ejs", { listing });
};


module.exports.editListing= async (req, res) => {
    let { id } = req.params;
    let listing = await Listings.findById(id);
    if(!listing){

        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
        
    }

    let place=listing.location;
    const response = await axios.get(`https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json`, {
        params: {
            key: process.env.MAP_API_KEY,  
            limit: 1 
        }
    });


    const features = response.data.features;
    if (!features || features.length === 0 || !features[0].geometry) {
        req.flash("error","Location not found Try Again!");
       return res.redirect("/listings/new");
    }

  
    listing.geometry=response.data.features[0].geometry;
    let originalUrl= listing.image.url.replace("/upload","/upload/w_250,");

    res.render("listings/edit.ejs", { listing ,originalUrl});
};

module.exports.updateListing= async (req, res) => {
    let { id } = req.params;
    let listing= await Listings.findByIdAndUpdate(id, { ...req.body.listings });
    

    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }


    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    console.log(req.file);
    await Listings.findByIdAndDelete(id);
    req.flash("success"," Listing  deleted");
    res.redirect("/listings");
}
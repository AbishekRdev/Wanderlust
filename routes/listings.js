const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync");
const {isLoggedIn,isOwner,validateListings}=require("../middleware.js");
const  listingController=require("../controller/listings.js")
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});




router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single("listings[image]"),
    validateListings,
    wrapAsync(listingController.createListing),
);



// new route
router.get("/new", isLoggedIn,listingController.renderNewForm);

// show
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listings[image]"),
    validateListings,
    wrapAsync(listingController.updateListing)
);



// edit route
router.get("/:id/edit",
isLoggedIn,
isOwner,
 wrapAsync(listingController.editListing));

// delete
router.delete("/:id",isLoggedIn, 
isOwner,
wrapAsync(listingController.destroyListing));


module.exports=router;


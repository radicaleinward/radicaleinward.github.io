var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
    // {
    //     name:"Granite Hill",
    //     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
    //     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite."
        
    // },
    // function(err, campground){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("NEWLY CREATED CAMPGROUND:  ");
    //         console.log(campground);
    //     }
    // });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index",{campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name; // pulls (REQuests) the namne from the POST that we're inside and named "name" in the new.ejs file
    var image = req.body.image;  // pulls the image from the POST we are inside and named "image" in the new.ejs file
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc} // {} is an object
  
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            
            res.redirect("/campgrounds");
        }
    });
});
                            
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is On");
});
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds",{campgrounds:allCampgrounds});
       }
    });
});

app.post("/campgrounds", function(req, res){
    
    var name = req.body.name; // pulls (REQuests) the namne from the POST that we're inside and named "name" in the new.ejs file
    var image = req.body.image;  // pulls the image from the POST we are inside and named "image" in the new.ejs file
    var newCampground = {name: name, image: image} // {} is an object
    
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is On");
});
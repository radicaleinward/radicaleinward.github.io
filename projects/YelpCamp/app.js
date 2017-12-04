var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
    {name: "Salmon Creek", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2927/14442300701_7952568539.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));  //no explanation as to the specifics of the code, other than "memorize it or copy/paste"
                                                   // just get used to having it in our code
app.set("view engine", "ejs"); // this makes it so we don't need to type out .ejs at the end of rendered files



app.get("/", function(req, res){
    res.render("landing");  // technically landing.ejs - we installed ejs as the engine viewer, so no need for file extensions here
});

app.get("/campgrounds", function(req, res){;
    res.render("campgrounds",{campgrounds:campgrounds}); // Passing data called "campgrounds" - we can call it anything. See
                                                         // line 3 on the campgrounds.ejs file. The left hand side name "campgrounds"
                                                         // can say anything, but the right hand side is the variable we named.
                                                         // at the time of writing this comment, there were three items in the array,
                                                         // and loading the page showed [object, Object] x 3.
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name; // pulls (REQuests) the namne from the POST that we're inside and named "name" in the new.ejs file
    var image = req.body.image;  // pulls the image from the POST we are inside and named "image" in the new.ejs file
    var newCampground = {name: name, image: image}; // {} is an object
    campgrounds.push(newCampground);  // push function sends new campground object(s) (see line above) to campgrounds page
    res.redirect("/campgrounds"); // sends user back to campgrounds GET page. GET is default for redirect requests
});  //same ejs name but DIFFERENT page because it's a POST vs a GET - best practice.  Post request
                            //should have the same name as the get request page.
                            
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server is On");
});


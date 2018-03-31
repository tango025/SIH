var express = require("express");
var app = express();
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var Shelterhome = require("./models/update");
var Comment = require("./models/comment");
var seedDB = require("./seeds");


//seedDB(); //seed the database

mongoose.connect("mongodb://localhost/code_snippet");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(expressSanitizer());
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "Once a",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = res.user;
   next();
});


app.get("/", function(req, res){
    res.render("landing");
});


app.get("/update", function(req, res){
    Shelterhome.find({}, function(err, allCodes){
        if(err){
            console.log(err);
        } else {
            res.render("update/update",{update:allCodes});
        }
    });
});

app.post("/update", function(req, res){
    var shellid = req.body.shellid;
    var password = req.body.password;
    var photo = req.body.photo;
    var rating = req.body.rating;
    var name = req.body.name;
    var address = req.body.address;
    var phoneno = req.body.phoneno;
    var longitude = req.body.longitute;
    var latitude = req.body.latitude;
    var city = req.body.city;
    var state = req.body.state;
    var newCode = {shellid: shellid, password: password, photo: photo, rating: rating, name: name, address: address, phoneno: phoneno, longitude: longitude, latitude: latitude, city: city, state: state }
    
    Shelterhome.create(newCode, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/update");
        }
    });
});

app.get("/update/new", function(req, res){
    res.render("update/new.ejs");
})

app.get("/update/:id", function(req, res){
    Shelterhome.findById(req.params.id).populate("comments").exec(function(err, foundCode){
        if(err){
            res.redirect("/update");
        } else {
            res.render("update/show", {update:foundCode});
        }
    });
})

app.get("/update/:id/edit", function(req,res){
    Shelterhome.findById(req.params.id, function(err, foundCode){
        if(err){
            res.redirect("/update");
        } else{
            res.render("edit", {update: foundCode});
        }
    });
});

app.delete("/update/:id", function(req, res){
    Shelterhome.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/update");
        } else{
            res.redirect("/update");
        }
    })
    
});

// ==============
// AUTH Routes
// =============

app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/update");
        });
    });
});


app.get("/login",function(req, res){
    res.render("login");
})

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/update",
        failureRedirect: "/login"
    }), function(req, res){
}); 

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/update");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticate()){
        return next();
    }
    res.redirect("/login");
}

// ===============
// Comment Routes
// ===============

app.get("/update/:id/comments/new", function(req, res){
    Shelterhome.findById(req.params.id, function(err, update){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {update: update});
        }
    })
    res.render("comments/new")
})

app.post("/update/:id/comments", function(req, res){
    Shelterhome.findById(req.params.id, function(err, update){
        if(err){
            console.log(err);
            res.redirect("/update");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username; 
                    comment.save();
                    update.comments.push(comment);
                    update.save();
                    res.redirect("/update/" + update.id); 
                }
            })
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Shellconnect server has stated");
})

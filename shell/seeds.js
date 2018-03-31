var mongoose = require("mongoose");
var Shelterhome = require("./models/update");
var Comment = require("./models/comment");

function seedDB(){
    Shelterhome.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("Removed homes!");
});
}

module.exports = seedDB;
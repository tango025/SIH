var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    rating: Number,
    comment: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        
    }
});

module.exports = mongoose.model("Comment", commentSchema);
var mongoose = require("mongoose");

var shelterhomeSchema = new mongoose.Schema({
    shellid: String,
    password: String,
    photo: String,
    name: String,
    address: String,
    phoneno: Number,
    Longitude: String,
    Latitude: String,
    city: String,
    state: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Shelterhome", shelterhomeSchema);

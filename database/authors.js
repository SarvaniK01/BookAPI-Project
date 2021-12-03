const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    id:String,
    name:String,
    book:[String]
});

const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel; 




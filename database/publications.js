const mongoose = require("mongoose");


const PublicationSchema = mongoose.Schema({
    id:String,
    name: String,
    book:[String]
});

const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;




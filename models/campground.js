var mongoose=require("mongoose");

var campgroundschema=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    day: String,
    slot: String,
    description: String,
    author:{
        id:Number,
        username: String
    },
    txn_id: String,
    btxn_id: String
    // comments:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "comment" 
    //     }
    // ]

});
module.exports=mongoose.model("campground",campgroundschema);  
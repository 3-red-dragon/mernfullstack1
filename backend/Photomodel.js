const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema(
    {
        image:String
       },
       {
         collection: "ImageDetails",
       }
     );     

const Photo = mongoose.model('Photo',photoSchema);
module.exports = Photo;
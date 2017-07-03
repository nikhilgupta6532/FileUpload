var mongoose = require('mongoose');

var File = mongoose.model('File',{
  fileName:{
    type:String,
    required:true,
    trim:true
  },
  // filePath:{
  //   type:String,
  //   required:true,
  //   trim:true
  // },
  createdAt:{
    type:Number,
    default:new Date().getTime()
  }
});

module.exports = {
  File
}

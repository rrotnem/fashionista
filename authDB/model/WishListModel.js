const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const listSchema = new Schema({
    productId: {
      type: String,
    },
    userId:{
        type:String,
    }

  });
  
module.exports = mongoose.model('WishList', listSchema)
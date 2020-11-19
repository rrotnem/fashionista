const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const productSchema = new Schema({
  id: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Product id is required',
  },
  title: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Title is required',
  },
  department: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Department is required'
  },
  description: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Description is required'
  },
  manufacturer: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Manufacturer is required'
  },
  url: {
    type: String,
    min: [4, 'Too short, min 4 characters are required'],
    max: [32, 'Too long, max 16 characters are required'],
    required: 'Description is required'
  },
  price:{
    type:Number,
    required:"Price is required"
  },
  quantity:{
      type:Number,
      required: "Quantity is required"
  },
  date: { type: Date, default: Date.now },


});

module.exports = mongoose.model('Product', productSchema)
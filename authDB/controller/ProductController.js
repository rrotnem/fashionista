const Product = require('../model/ProductModel')


exports.StoreProduct = (req, res)=>{
    let product = new Product({
        id:req.body.id,
        title:req.body.title,
        department:req.body.department,
        description:req.body.description,
        manufacturer:req.body.manufacturer,
        url:req.body.url,
        price:req.body.price,
        quantity:req.body.quantity,
        date: new Date()
    });
    console.log(product)
    product.save((err,result) =>{
        if (err) {
          console.log(err)
            return res.status(422).json({
              'error': 'Oops! Something went wrong'
            })
          }
          return res.status(200).json({ 'registered': true })       
    })
}

exports.GetAllProducts = (req, res) =>{
  Product.find({},(err, data)=>{
      if(err) throw err;
      res.json(data);
  })
}
exports.GetProductById = (req, res) =>{
  var id = req.params.id;
  Product.findOne({_id:id},(err, data)=>{
      if(err) throw err;
      res.json(data);
  })
}
exports.DeleteProductInfo = (req, res)=>{
  var deleteId = req.params.id;
  Product.deleteOne({_id:deleteId},(err,result)=>{
      if(err) throw err;
      if(result.deletedCount > 0){
      res.json({"msg": "Record delete Successfully"})
      }else{
          res.json({"msg":"Record doesn't exist"})
      }
      //res.send("Record delete" + result)
  })
}
exports.UpdateProductInfo = (req, res) =>{
  var updateID = req.body.id;
  var updatePrice = req.body.price;
  var updateDescription = req.body.description;
  var updateQuantity = req.body.quantity;
  var updatemanufacturer = req.body.manufacturer;
  var updateDepartment = req.body.department;
  var updateTitle= req.body.title;
  var updateURL = req.body.url;

  Product.updateOne({id:updateID},{$set:{
    title:updateTitle, 
    department:updateDepartment,
    description: updateDescription,
    manufacturer:updatemanufacturer,
    url:updateURL,
    price:updatePrice,
    quantity:updateQuantity

  }},
      (err,result)=>{

          if(err) throw err;
          //res.send("Record updated ..."+ result)
          if(result.nModified > 0){
          res.json({"msg": "Record update Successfully"})
          }else{
              res.json({"msg":"Record doesn't exist."})
          }
  })
}
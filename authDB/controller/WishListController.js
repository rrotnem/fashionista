const WishList = require('../model/WishListModel')


exports.StoreList = (req, res) => {
    let list = new WishList({
        productId: req.body.productId,
        userId: req.body.userId
    });

    list.save((err, result) => {
        if (err) {
            console.log(err)
            return res.status(422).json({
                'error': 'Oops! Something went wrong'
            })
        }
        return res.json({ 'msg': "List added Successfully" })
    })
}


exports.GetALLList = (req, res) => {
    var id = req.params.id;

    //Db.student.insert({-id:1001, name:”joe”, ts_id:db.trainer.find()[0]})
    WishList.find({userId: id}, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(422).json({
                'error': 'Oops! Something went wrong'
            })
        }  

        return res.json(data)
    })
}
exports.RemoveListById = (req, res) =>{
    var id = req.params.id;
    WishList.deleteOne({productId:id},(err, data)=>{
        if(err) throw err;
        return res.json({
            'msg': 'List is deleted.'
        })
    })
  }
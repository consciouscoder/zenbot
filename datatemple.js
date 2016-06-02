var dataTemple = require("./models")

module.exports = {
  all : function(req,res) {
      dataTemple.find({}, function(err,collection){
        if (err) {
          res.json({message: "database error: ", error:err})
        }
        else {
          res.json(collection)
        }
      })
  },

  create : function(req,res) {
    var data = new dataTemple (req.body);
    data.save(function(err, data){
      if(err) {
        res.json({message: "database error: ", error:err})
      }
      else {
        res.json(data)
      }
    })
  },

  update: function(req,res){
    dataTemple.findOneAndUpdate({_id: req.params.id}, req.body,{new: true},
    function(err, data){
      if(err) {
        res.json({message: "database error: ", error:err})
      }
      else {
        res.json(data)
      }
    })
  },
  showOne: function(req,res){
    dataTemple.findOne({_id: req.params.id},
    function(err, data){
      if(err) {
        res.json({message: "database error: ", error:err})
      }
      else {
        res.json(data)
      }
    })
  },

  delete: function(req,res){
    dataTemple.findOneAndRemove({_id: req.params.id}, function(err, data){
      if(err) {
        res.json({message: "database error: ", error:err})
      }
      else {
        res.json({message: "deleted the Date Temple!", id: req.params.id})
      }
    })
  }

}

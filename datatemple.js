var dataTemple = require("./models")

module.exports = {
  all : function(req,res) {

      // var botData = dataTemple.tScrap(req.body)

      // botData.user = req.decoded.id

        console.log('TWITTER FIND')

        dataTemple.tScrap.find({}, function(err, collection){
          if (err) {
            res.json({message: "database error: ", error:err})
          }
          else {
            console.log('DATABASE RESPONSE collection:', collection)
            res.send(collection)
          }
        })

  },

  all2 : function(req,res) {

  console.log('GOOGLE FIND')

  dataTemple.gScrap.find({}, function(err, collection){
    if (err) {
      res.json({message: "database error: ", error:err})
    }
    else {
      console.log('DATABASE RESPONSE collection:', collection)
      res.send(collection)
    }
  })

},

  create : function(req,res) {
    // console.log('datatemple.js req: ', req.body)

    if (req.body.googleQuery) {
      console.log('GOOGLE CREATE')
      var botData = new dataTemple.gScrap (req.body)
    } else {
      console.log('TWITTER CREATE')
      var botData = new dataTemple.tScrap (req.body)
    }

    botData.user = req.decoded.id

    // console.log('tScrape: ', botData)
    botData.save(function(err, data){
      if(err) {
        res.json({message: "database error: ", error:err})
        console.log("error:", err)
      }
      else {
        res.json(data)
        console.log('saved database: ', data)
      }
    })
  },

  // createGoogleData : function(req,res) {
  //   var botData = new dataTemple.gScrap (req.body);
  //   botData.user = req.decoded.id
  //
  //   // console.log('tScrape: ', botData)
  //   botData.save(function(err, data){
  //     if(err) {
  //       res.json({message: "database error: ", error:err})
  //       console.log("error:", err)
  //     }
  //     else {
  //       res.json(data)
  //       console.log('saved database: ', data)
  //     }
  //   })
  // },

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

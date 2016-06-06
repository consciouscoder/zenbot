var  mongoose = require("mongoose")
var bcrypt = require('bcryptjs')

var twitterScrapSchema = mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    twitterName: String,
    tweets: [],
    createdAt: {type: Date, default: Date.now}

  })

var googleScrapeSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    googleQuery: String,
    topWords: [{key : String, value : Number}],
    createdAt: {type: Date, default: Date.now}

  })

var userSchema = mongoose.Schema({

    username: {
      type: String,
      unique: true
    },
    password: String,
    twitterScrapes: [twitterScrapSchema],
    googleWordScrapes: [googleScrapeSchema]

  })

userSchema.pre('save', function(next) {
  var user = this
  var hashPassword = bcrypt.hashSync(user.password, 8)
  user.password = hashPassword
  console.log('Encrypting PW-------------------')
  next()
})

userSchema.methods.authenticate = function(userPassword) {
  var user = this
  return bcrypt.compareSync(userPassword, user.password)
}

module.exports = {
    tScrap: mongoose.model("twitterScrap", twitterScrapSchema),
    gScrap: mongoose.model("googleScrap", googleScrapeSchema),
    User: mongoose.model('User', userSchema)
}

// module.exports = mongoose.model("User", userSchema)

// var  mongoose = require("mongoose")
//
// var discSchema = mongoose.Schema({
//    name: {type: String},
//    weight: {type: Number},
//    color: {type: String},
//    category: {type: String},
//    picture: {type: String}
//
// })
//
// module.exports = mongoose.model("disc", discSchema)

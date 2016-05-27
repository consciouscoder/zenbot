var  mongoose = require("mongoose")
var bcrypt = require('bcryptjs')

var userSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true
    },
    password: String
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


module.exports = mongoose.model("User", userSchema)

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

var express = require('express'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  app = express(),
  port = 8080,
  cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken'),
  save = require("./models"),
  mySpecialSecret = "boom"

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(logger('dev'))
app.use(express.static(__dirname + '/public'))
mongoose.connect('mongodb://localhost/discs')
  // import bcrypt module
var bcrypt = require('bcryptjs')

  // User model and Schema
// var userSchema = mongoose.Schema({
//     username: {
//       type: String,
//       unique: true
//     },
//     password: String
//   })

  // Model middleware that runs before user is saved to db
// userSchema.pre('save', function(next) {
//   var user = this
//   var hashPassword = bcrypt.hashSync(user.password, 8)
//   user.password = hashPassword
//   console.log('Encrypting PW-------------------')
//   next()
// })

// Add a method to the userSchema to validate a pw
// userSchema.methods.authenticate = function(userPassword) {
//   var user = this
//   return bcrypt.compareSync(userPassword, user.password)
// }

var User = mongoose.model('User', save.userSchema)

// create my signup and login routes
app.post('/signup', function(req, res) {
  var user = new User(req.body)
  console.log('Before save-------------------')
  user.save(function(err, user) {
    if (err) {
      res.json(err)
    } else {
      console.log('After save-------------------')

      res.json(user)
    }
  })
})


app.post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      res.json(err)
    } else if (user) {
      if (user.authenticate(req.body.password)) {
        //COOKIES ARE SO 1994!!!!!!!
        // var userSessionID = Math.random()
        // res.cookie('userSessionID', userSessionID, {httpOnly:true})
        // res.json({message: "you have successfully logged in!",sessionID: userSessionID, success: true})
        // 3 - Generate the JWT
        var token = jwt.sign({
            name: user.username
          }, mySpecialSecret, {
            expiresIn: 1440
          })
          // 4 - Send back a success message with the JWT
        res.json({
          success: true,
          message: 'YOU get a token! YOU get a token! YOU get a token!',
          token: token

        })

      } else {
        res.json({
          message: "your password does not match!",
          success: false
        })
      }
    } else {
      res.json({
        message: "could not find user: " + req.body.username,
        success: false
      })
    }
  })
})
//Not recommended
// app.use(authorize)
app.get('/api/friends', authorize, function(req, res) {
  var friends = ["Batman", "Donald Trump", "Snoopy", "Kanye West"]
  res.json({friends: friends, user: req.decoded.name})
})

function authorize(req, res, next) {
  //check if a cookie exists if so let them pass
  // if(req.cookies.userSessionID){
  //   next()
  // }else{
  //   //tell the to fuck off
  //   res.json({message: "No cookie you buster! F***k Off!", success: false})
  // }
  // 1 - let's check everywhere for the user's token
  var token = req.body.token || req.param('token') || req.headers['x-access-token']
    // 2 - If we find a token, we will use mySpecialSecret to try and decode it
    //      - if it can't be decoded, send the user an error that they don't have the right token
    console.log("token from client", token);
  if (token) {
    jwt.verify(token, mySpecialSecret, function(err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "can't authenticate token"
        })
        //      - if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
      } else {
        req.decoded = decoded;
        next()
      }
    })
  } else {

    // 3 - If we can't find a token at all, we'll just send back an error message
    return res.status(403).send({
      success: false,
      message: "no token provided"
    })
  }

}

app.listen(port)

var router = require('express').Router(),
  dataControl = require('./datatemple'),
  mySpecialSecret = "boom",
  jwt = require('jsonwebtoken')

router.route('/datatemple')
  .get(dataControl.all)
  .post(authorize,dataControl.create)
router.route('/datatemple/:id')
  .put(dataControl.update)
  .delete(dataControl.delete)
  .get(dataControl.showOne)

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

module.exports = router

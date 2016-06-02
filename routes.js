var router = require('express').Router(),
  dataControl = require('./datatemple')

router.route('/datatemple')
  .get(dataControl.all)
  .post(dataControl.create)
router.route('/datatemple/:id')
  .put(dataControl.update)
  .delete(dataControl.delete)
  .get(dataControl.showOne)

module.exports = router

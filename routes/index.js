const express = require('express');
const router  = express.Router();
const item = require('../models/Item')

/* GET home page */
router.get('/', (req, res, next) => {

  
  item.find()
  .then(items=>{
    res.render('index',{items});
  })
  .catch(e=>console.log(e));
});


module.exports = router;

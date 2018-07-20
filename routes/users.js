const router = require('express').Router();
const User = require('../models/User');
const uploadCloud = require('../helpers/cloudinary');
const item = require('../models/Item')


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
}

function isLoggedInAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.userType === "admin") return next();
    return res.redirect('/login?next=/profile')
}


//User profile
router.get('/profile', isLoggedIn, (req,res,next)=>{

    User.findById(req.user._id)
    .populate('itemsFound')
    .populate('lostItems')
    .then(user=>{
        res.render('users/profile', user)
    })
});

router.get('/general', isLoggedIn, (req,res,next)=>{
    item.find({found: false})
    .then(items=>{
    res.render('users/general',{items});
    })
    .catch(e=>console.log(e));
});

router.get('/administrator', isLoggedInAdmin, (req,res)=>{
    res.render('users/admi');
})


module.exports = router;
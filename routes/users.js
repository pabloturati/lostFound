const router = require('express').Router();
const User = require('../models/User');
const uploadCloud = require('../helpers/cloudinary');
const item = require('../models/Item')


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/profile')
}

router.get('/users/:id', (req,res,next)=>{
    User.findById(req.params.id)

    .then(user=>{
        if(!user) res.redirect('/users');
        res.render('users/profile', user)
        req.User.photoURL = req.file.url;
    })
    .catch(e=>next(e))
})

router.get('/users', (req,res, next)=>{
    res.render('users/search')
});

router.post('/users', (req,res, next)=>{
    User.find({username: {$regex:req.body.username, $options:'i'}})
    .then(users=>{
        res.render('users/search', {users});
    })
    .catch(e=>next(e))
});

// router.post('/profile', isLoggedIn, uploadCloud.single('foto'), (req, res, next)=>{
//     if(!req.file) redirect('/profile');
//     req.user.photoURL = req.file.url;
//     User.findOneAndUpdate(req.user._id, req.user, {new:true})
//     .then(user=>{
//         res.redirect('/profile')
//     })
//     .catch(e=>next(e))
// });

router.get('/general', isLoggedIn, (req,res,next)=>{
    item.find()
    .then(items=>{
    res.render('users/general',{items});
    })
    .catch(e=>console.log(e));
});

module.exports = router;
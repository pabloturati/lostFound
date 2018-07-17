const express = require('express');
const router  = express.Router();
const User = require('../models/User');

const passport = require('passport');
const sendActivationLink = require('../helpers/mailer').sendActivationLink;

const errDict = {
    UserExistsError: "Este usuario ya existe"
}

function isAuth(req,res,next){
    if(req.isAuthenticated()) return res.redirect('/general');
    return next();
}

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()) return next();
    return res.redirect('/login?next=/activation')
}

// router.get('/activation', isLoggedIn, (req,res,next)=>{
//     User.findByIdAndUpdate(req.user._id, {active:true}, {new:true})
//     .then(user=>{
//         res.send('Activado, gracias ' + user.username);
//     })
//     .catch(e=>next(e))
// })

router.get('/signup', (req,res,next)=>{
    res.render('auth/signup')
});

router.post('/signup', (req,res,next)=>{
    if(req.body.password !== req.body.password2){
        req.body.err = "Tu password no coincide"
        res.render('auth/signup', req.body)
    }
    User.register(req.body, req.body.password)
    .then(user=>{
        console.log('entraste')
        //activation link
        sendActivationLink(user);
        //loguearlo automaticamente
        res.redirect('/login')
    })
    .catch(e=>{
        req.body.err = errDict[e.name];
        res.render('auth/signup', req.body)
    });
});

router.get('/login', isAuth, (req,res,next)=>{
    res.render('auth/login', {next:req.query.next})
});

router.get('/profile', isLoggedIn, (req,res,next)=>{
    res.render('users/profile')
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    if(req.body.next) res.redirect(req.body.next);
    req.app.locals.loggedUser = req.user;
    res.redirect('/general')
});

router.get('/logout', (req,res,next)=>{
    req.logout();
    res.redirect('/login')
});

router.get('/activation', (req,res)=>{
        var id = req.params.id
        User.findByIdAndUpdate(id, {active:true}, {new:true})
        .then(nuevoUsuario=>{
            console.log("usuario activo")
            res.redirect("/login")
            //res.send(nuevoUsuario)
        })
        .catch(e=>console.log(e))
})


// router.get('/activation/:id', (req,res)=>{
//     var id = req.params.id
//     User.findByIdAndUpdate(id, {active:true}, {new:true})
//     .then(nuevoUsuario=>{
//         res.json(nuevoUsuario)
//         //res.send(nuevoUsuario)
//     })
//     .catch(e=>console.log(e))
// })

module.exports = router;

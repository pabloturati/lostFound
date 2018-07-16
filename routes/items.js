const router = require('express').Router();
const Item = require('../models/Item');

//Multer + coudinary
const uploadCloud = require('../helpers/cloudinary');
const multer = require('multer');
const upload = multer({dest: "./public/assets"})


//Lista de itesm

router.get('/', (req,res) =>{  //   /items  (es la lista de items)
    res.send("lista por crear con todos lo items en la DB")
})

//Generar new item
router.get('/newItem', (req,res) =>{
    res.render('items/newItem');

})

router.post('/newItem', uploadCloud.single('photoURL'), (req,res, next) => {
    console.log(req.file)
    req.body.photoURL = req.file.url;
    Item.create(req.body)
    .then(thisItem=>{
        res.json(thisItem)
        // res.send("item creada")
    })
    .catch(e=>console.log(e))
})


// router.post('/signup', (req,res,next)=>{
//     if(req.body.password !== req.body.password2){
//         req.body.err = "Tu password no coincide"
//         res.render('auth/signup', req.body)
//     }
//     User.register(req.body, req.body.password)
//     .then(user=>{
//         console.log('entraste')
//         //activation link
//         sendActivationLink(user);
//         //loguearlo automaticamente
//         res.redirect('/login')
//     })
//     .catch(e=>{
//         req.body.err = errDict[e.name];
//         res.render('auth/signup', req.body)
//     });
// });




//Entrar al detalle de un item
router.get('/:id', (req,res) =>{
    res.send("hola detalle items")
})

module.exports = router;
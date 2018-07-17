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

//Entrar al detalle de un item
router.get('/:id', (req,res) =>{
    res.send("hola detalle items")
})

module.exports = router;
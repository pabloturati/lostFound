const router = require('express').Router();
const Item = require('../models/Item');
const User = require('../models/User');

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

// router.get('/success', (req,res) =>{
//     res.render('items/success');
// })

router.post('/newItem', uploadCloud.single('photoURL'), (req,res, next) => {
    
    req.body.photoURL = req.file.url;
    req.body.founder = req.user._id;
    console.log(req.body.founder);
    Item.create(req.body)
    .then(thisItem=>{        
        User.findByIdAndUpdate(req.user._id, {$push: {itemsFound: thisItem}}, {new:true})
        .then(r =>{
            console.log(r)
            thisItem.founder=r
            console.log(thisItem)
            console.log(thisItem.founder);
            res.render("items/success",{thisItem})
            //res.json(thisItem)
        })
        
    })
    .catch(e=>console.log(e))

})

router.get('/updateOwner',(req,res)=>{
    res.send("update owner");
})

router.post('/updateOwner', (req,res)=>{
    let idItem = req.body.idObjeto; //Id del item
    let userEmail= req.body.emailUsuario; //email del usuario
    let userID;

    console.log("entre");
    console.log(req.body);
    // console.log(req.body);

})

//Entrar al detalle de un item
router.get('/:id', (req,res) =>{
    res.send("hola detalle items")
})

module.exports = router;
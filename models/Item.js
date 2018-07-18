
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    photoURL: {
        type: String,
        default: 'https://cdn.shopify.com/s/files/1/1490/3046/products/car_moixx_18-85.jpg?v=1515517516'
    },
    found: {
        type: Boolean,
        default: false
    },
    objeto:{
        type: String,
        enum: ["Cartera", "Prenda", "Celular", "Identificacion", "Otro"],
        default: "Otro" 
    },
    estacion:{
        type: String
    },
    linea:{
        type:String,
        enum: ["L1", "L2", "L3", "L4", "L5","L6", "L7", "L8", "L9", "L10", "L11", "L12"],
        default: "No definido"
    },
    trasporte:{
        type: String,
        enum: ["Metro", "Metrobus"]
    },
    currlocation:{
        type: String,
        default: "Centro de recuperacion del Metro"
    },
    detalle: String,
    owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ,
    founder:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ,
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Item', itemSchema);
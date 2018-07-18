
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    photoURL: {
        type: String,
        default: 'http://botornot.co/blog/wp-content/uploads/2015/04/fakefollowers2-554x255.png'
    },
    active: {
        type: Boolean,
        default: false
    },
    username:String,
    email: String,
    photoURL: String,
    lostItems:[
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ],
    itemsFound:[
        {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    ]
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = mongoose.model('User', userSchema);
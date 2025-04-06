const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required :true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    rating:{
        type:Number,
        default:4,
        min:0,
        max:5
    },
    image:{
        type:String,
        default:
            "https://imgs.search.brave.com/v-OwT3FQhPek5qZ625qyAxuhwM-Nc4X9ZpYRO_cMZbo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzQxLzMwLzcy/LzM2MF9GXzI0MTMw/NzIxMF9NamphSkMz/U0p5MnpKWjZCN2JL/R01Sc0tRYmR3UlN6/ZS5qcGc",
    }
},{
    timestamps:true
}
);

module.exports = mongoose.model('Food',foodSchema);
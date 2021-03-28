const mongoose = require('mongoose')
const Schema= mongoose.Schema

const productSchema = new Schema({       
    nombre: String,
    descripcion: String,
    codigo:String,
    precio: Number,
    stock: Number
}, {
    versionKey: false // You should be aware of the outcome after set to false
}
)

module.exports =  mongoose.model('productos',productSchema)
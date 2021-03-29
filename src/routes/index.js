const express = require('express')

const router = express.Router()

const moment = require('moment')

const Productos = require('../models/products')

const Mensajes = require('../models/messages')

const client = require('../app')





cargarItems = async () => {
     productos = await Productos.find({})
   
}

newItem = async (prod) => {
    newProduct= await new Productos(prod)
    await newProduct.save()
}
    
cargarMessages = async () => {
     mensajes = await Mensajes.find({})     
     
}

newMessage = async (msj) => {
    newMessage= await new Mensajes(msj)
    await newMessage.save()
   
}
router.get('/',(req,res) => {
    res.render('main')
})

router.get('/productos',async (req,res) => {
    await cargarItems()
    
    await res.render('./layouts/productos',{'productos': productos})

})

router.post('/productos/add',async (req,res) => {
    
     newItem(req.body)
     cargarItems()
    await res.redirect('/productos')
})

router.get('/chat',async (req,res) => {
    await cargarMessages()
    await res.render('./layouts/messages',{'mensajes':mensajes})
})

router.post('/chat/add', async (req,res) => {
    let time = moment().format(); 
    const  addNewMessage = {autor:req.body.autor,
                        mensaje:req.body.mensaje,
                        now:moment(time).format('DD/MM/YYYY HH:MM:SS')}    
    await newMessage(addNewMessage)
    res.redirect('/chat')
})

module.exports=router
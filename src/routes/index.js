const express = require('express')

const router = express.Router()

const path = require('path')

const moment = require('moment')


const Mensajes = require('../models/messages')

const bodyParser = require('body-parser');

let server = require('../app')
let admin = server.admin

// create application/x-www-form-urlencoded parser
router.use=bodyParser.urlencoded({ extended: true })

const normalizr = require("normalizr")
const util =require('util')

const normalizar= normalizr.normalize
const desnormalizar= normalizr.denormalize
const schema = normalizr.schema

//DEFINIMOS UN NUEVO ESQUEMA DE USUARIOS
const user = new schema.Entity('users',{idAttribute:'email'})

//DEFINIMOS UN NUEVO ESQUEMA TEXTO
const text = new schema.Entity('texts')

//DEFINIMOS UN NUEVO ESQUEMA DE MENSAJES
const message = new schema.Entity('message',{
    author:user,
    text:text
},{
    idAttribute:"_id"
})

function toObject(arr) {
    let texto
    for (var i = 0; i < arr.length; ++i){
        if(i==0){
            texto =arr[i];
        }else{
            texto +=","+arr[i];
        }
        
    }
      
    return texto
  }
  

function print(myObj){
    console.log(util.inspect(myObj,false,12,true))
}

cargarMessages = async () => {
    
     mensajes = await Mensajes.find({})   
     data =toObject(mensajes)
     try {
         dataParsed= JSON.stringify(data, null, '\t')
        console.log(dataParsed)
         
     } catch (error) {
         console.log(error)
     }
     
     
    
     
     
     
}

newMessage = async (msj) => {
    
    newMessage= await new Mensajes(msj)
    newMessage.save() 
   
}



//   -----------------------------------------------
//  ------------          CHAT             ---------
router.get('/chat',async (req,res) => {
     try {
         await cargarMessages()
        res.status(200) 
        if(mensajes.length===0)   {
            res.send({Mensaje:`No existen mensajes para visualizar.`}) 
        }
        res.send({Mensajes:mensajes})
         
     } catch (error) {
         res.status(204)
         res.send({Error:`No se ha podido visualizar los mensajes correctamente.`})
     }
    
})

router.post('/chat/add', async (req,res) => {
    try {
        let time = moment().format(); 
        const  addNewMessage = {autor:req.body.autor,
                            mensaje:req.body.mensaje,
                            now:moment(time).format('DD/MM/YYYY HH:mm')}    

        await newMessage(addNewMessage)

        res.status(200)
        res.send({Mensaje:`Nuevo mensaje registrado.`})
    } catch (error) {
        res.status(204).send({Error:`No se ha podido registrar correctamente el mensaje.`}) 
            
    }
  
    
})

module.exports=router
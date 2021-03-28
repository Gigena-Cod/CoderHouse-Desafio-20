     const mongoose = require('mongoose')

     const user = 'Destroxides';
     const password= '1590kalen';
     const database='ecommerce';
     
     
     const uri = `mongodb+srv://${user}:${password}@cluster0.msxtw.mongodb.net/${database}?retryWrites=true&w=majority`
     
     //CONECTING MONGO
     conectar = async () =>{
         try {
             await mongoose.connect(uri,{useNewUrlParser: true, 
                useUnifiedTopology: true})
             console.log('Connected database')
         } catch (err) {
             console.log(err)
         }
         
     
     }
     
     desconectar = async () =>{
         try {
             await mongoose.connection.close()
             console.log('Disconect database')
         } catch (err) {
             console.log(err)
         }
     }
     
     
     module.exports= {
         desconectar,
         conectar
     }
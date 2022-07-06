import mongoose from "mongoose";
// const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;


// // export default function connectToDatabase(){
// //     mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?directConnection=true`)
    
// //     const database = mongoose.connection;
    
// //     database.on("error",(error)=>{console.log(error)})
    
// //     database.once("open",()=>{console.log("Connected to on database.")})
    
    
// // }

const mongo_uri = process.env.MONGO_URI

export default function connectToDatabase(){

    if(mongo_uri){

        mongoose.connect(mongo_uri)
        
        const database = mongoose.connection;
        
        database.on("error",(error)=>{console.log(error)})

        database.once("open",()=>{console.log("Connected to on database.")})

    }

}

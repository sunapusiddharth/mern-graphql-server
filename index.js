import express from 'express';
import bodyParser from 'body-parser'
import expressGraphQl from 'express-graphql'
import mongoose from  'mongoose'
import cors from 'cors'
import graphQLSchema from './graphql/schema'
import graphQLResolvers from './graphql/resolvers'
require('dotenv').config()

const app=express()

//using cors :
app.use(cors(),
bodyParser.json())




//graphql
app.use("/graphql",
expressGraphQl({
    schema:graphQLSchema,
    rootValue:graphQLResolvers,
    graphiql:true
}))

function main(){
    const port = process.env.PORT || 8080
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-taxoy.mongodb.net/test?retryWrites=true&w=majority`
    const uri2 = "mongodb://127.0.0.1:27017/mern-graphql"
    mongoose.connect(uri2,{useNewUrlParser:true})
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Servet running on port ${port}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })
   
}





main()
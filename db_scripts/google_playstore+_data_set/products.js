var mongoose = require("mongoose");
 mongoose.connect("mongodb://127.0.0.1:27017/mern-graphql"); 
var db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error"));
 db.once("open", function(callback) {     console.log("Connection succeeded.");
 });

const PlaystoreApp = require('../../models/playstore_app')
const Users = require('../../models/users')
const csvFilePath ='googleplaystore.csv'

const csv=require('csvtojson')

const insertDocs = async()=>{
    csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj);
    var BreakException = {};
    //parsing the json object here before inserting  into the db 
  jsonObj.forEach(ob=>{
    let copyJson  = ob
      let {Rating,Reviews,Price} = copyJson
      const last_updated_date = (copyJson['Last Updated'])
      //parsign the types :
      Rating = parseInt(Rating)
      Reviews = parseInt(Reviews)
      Price = parseInt(Price)
      //copying the object with new props 
      ob=  {...copyJson,Rating,Reviews,Price} 
      // console.log("insied hte fn ",(ob))
      // throw BreakException;
      
      //code below to add the data into the db 
      addDataToDb(ob)
    
    
  })
  return
})
 

}

const addDataToDb = async (obj)=>{
  console.log("inside fn ",obj)
   PlaystoreApp.create(obj,(err,res)=>{
     if(err){
       return err
     }
   })
}

insertDocs()


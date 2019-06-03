import PlaystoreApp from '../models/playstore_app'


const getPlaySToreData = async function(){
    console.log("from insider the constrollr")
    let results = await PlaystoreApp.find().limit(10)
    let category_groups = await PlaystoreApp.aggregate([
        {$group:{"_id":"$Category"}}
    ])

    let aggregated_result = await PlaystoreApp.aggregate([
        {$group:{"_id":"$Category","doc":{"$first":"$$ROOT"}}},
        {"$replaceRoot":{"newRoot":"$doc"}},
        // {$sort:{"Rating":1,"Reviews":-1}}
    ])


    //for getting the groupby results :
    let aggregated_result2 = await PlaystoreApp.aggregate([
        {$group:{
            "_id":"$Category",
            App:{$addToSet:"$$ROOT"}
            }
        },
        {$limit:100} 
    ])


    let aggregated_result3 = await PlaystoreApp.aggregate([
        {$group:{
            "_id":"$Category",
            "doc":{"$addToSet":"$$ROOT"}
            }
        },
        // {"$replaceRoot":{"newRoot":"$doc"}},
        // {$limit:100} 
    ])
    // console.log(aggregated_result)
    return aggregated_result3
}

module.exports = {
    getPlaySToreData:getPlaySToreData
}


///aggregate with group by :
// db.playstoreapps.aggregate([{"$group":{"_id":"$Category","doc":{"$first":"$$ROOT"}}},{"$replaceRoot":{"newRoot":"$doc"}}])
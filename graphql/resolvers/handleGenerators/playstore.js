import PlaystoreApp from '../../../models/playstore_app'


export async function getAllPlayStoreApps(Category){
    let results = await PlaystoreApp.find()
    console.log(results)
    return results
}


export  async function getPlaystoreAppsByCategory(Category){
    let aggregated_result3 = await PlaystoreApp.aggregate([
        {$group:{
            "_id":"$Category",
            "doc":{"$addToSet":"$$ROOT"}
            }
        },
        // {$limit:10}
    ])
    return aggregated_result3
}


export async function getAppsByCategory({Category}){
    // console.log(Category)
    let categorised_results = await PlaystoreApp.find({"Category":Category})
    return categorised_results
}

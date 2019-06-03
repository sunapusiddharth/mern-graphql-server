import {buildSchema} from 'graphql'

export default buildSchema(`
    type User{
        _id:ID,
        email:String!,
        token:String!
    }

    input UserInput{
        email:String!,
        password:String!,
        confirm:String!
    }
    
    type PlaystoreApp{
        _id:ID,
        App:String,
        Category:String,
        Rating:Int,
        Reviews:Int,
        Size:String,
        Price:Float,
        Genres:String,
    }

    type PlaystoreAppByCategory{
        _id:String!,
        doc:[PlaystoreApp]
    }

    type RootQuery{
        login(email:String!,password:String!):User
        verifyToken(token:String!):User
        getAllPlayStoreApps(Category:String):[PlaystoreApp]
        getPlaystoreAppsByCategory(Category:String):[PlaystoreAppByCategory]
    }

    type RootMuatation{
        createUser(userInput:UserInput):User
    }

    schema{
        query:RootQuery
        mutation:RootMuatation
    }
`)
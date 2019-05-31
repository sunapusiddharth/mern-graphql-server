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

    type RootQuery{
        login(email:String!,password:String!):User
        verifyToken(token:String!):User
    }

    type RootMuatation{
        createUser(userInput:UserInput):User
    }

    schema{
        query:RootQuery
        mutation:RootMuatation
    }
`)
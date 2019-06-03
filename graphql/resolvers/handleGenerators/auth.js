import User from '../../../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



//muation resolver for creating the user 
export async function createUser(args){
    console.log('inisde fn ',args)
    try{
        const {
            email,
            password,
            confirm
        } = args.userInput

        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new Error('User already exists')
        }

        if(password!==confirm){
            throw new Error('Passwords do not match')
        }
        const hashedPassword =  await bcrypt.hash(password,10)
        const user = new User({
            email,
            password:hashedPassword
        },(err)=>{if (err) throw err})
        console.log('inisde fn nbew user ',user)
        user.save()


        //verification success
        const token = jwt.sign({id:user._id},"mysecret")
        return {token,password:null,...user._doc}
    }catch(err){
        throw err
    }
}


export async function login(args){
    try{
        const user = await User.findOne({email:args.email})
        if(!user) throw new Error ('Email dopesnt exists')

        const passwordValid = await bcrypt.compareSync(args.password,user.password)
        if(!passwordValid) throw new Error('Passwords do not match')

        const token  =jwt.sign({id:user._id},"mysecret")
        return {token,password:null,...user._doc}
    }catch(err){
        throw err
    }
}


export async function verifyToken(args){
    console.log("from the verifyToken function",args)
    try{
        const decoded = jwt.verify(args.token,"mysecret")
        console.log("from the verifyToken function",decoded)
        const user = await User.findOne({_id:decoded.id})
        return {...user._doc,password:null}
    }catch(err){
        throw err
    }
}


//queries :

/*
mutation{
  createUser(userInput:{
    email:"testuser1@gmail.com",
    password:"test_password",
    confirm:"test_password"
  }){
    email,
    _id,
    token
  }
}

query{
  login(email:"testuser1@gmail.com",password:"test_user"){
    email,token
  }
}

query{
  verifyToken(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjBmYzg3MmNhZWMyMzU5NDVmNGMwNyIsImlhdCI6MTU1OTI5Nzg4Nn0.y_I9RizkEGWxJaioUZFcZSfM1O0YiAqzcOAVNqXpiZc"){
    email,_id
  }
}



*/

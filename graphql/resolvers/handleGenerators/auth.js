import User from '../../../models/users'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'




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
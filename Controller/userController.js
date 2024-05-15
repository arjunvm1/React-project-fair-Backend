
const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken')


//register
exports.register =async (req,res) =>{
    console.log("inside register controller function");
    const {username,email,password} = req.body
    try{
    //check if the email is already exist  in database or not 
    const existingUser = await users.findOne({email})
    if(existingUser){
        return res.status(406).json("user already exist...Please login")
    }else{
        const newUser= new users({
            username,email,password,github:"",linkedin:"",profile:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
}
catch(err){
    res.status(500).json(`Register api failed,Error:${err}`)
}

}



exports.login = async (req,res)=>{
    
    console.log("inside login function");
    const {email,password} = req.body
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},"secret123")
            res.status(200).json({
                existingUser,token
            })
        }else{
            res.status(404).json("incorrect email/password")
        }

    } catch (err) {
        res.status(401).json(`Login api failed,Error:${err}`)
    }
}
const validator =require('validator')

const validateSingUp = (req)=>{
    const {firstName,lastName,emailId,password} = req.body

    if(!firstName || !lastName){
        throw new Error("Please Enter You Name")
    }
    // else if(!validator.isEmail(emailId)){
    //     throw new Error("Please Enter validate Email Id")
    // }

    // else if(!validator.isStrongPassword(password)){
    //     throw new Error("Please Enter Strong PassWord")
    // }

}


module.exports = {
    validateSingUp
}
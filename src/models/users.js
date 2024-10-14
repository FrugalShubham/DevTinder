const mongoose = require("mongoose")
var validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName :{
        type:"String",
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:"String"
    },
    emailId:{
        type:'String',
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter valid emailID " + value)
            }
        }
    },
    password:{
        type:'String',
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter strong password { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 } " + value)
            }
        }
    },
    age:{
        type:"Number",
        min:18,
    },
    gender:{
        type:"String",
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("this gender is not allow");
            }
        }
    },
    about:{
        type:"String",
        default:'This is default about for all user',
    },
    photoUrl:{
        type:'String',
        default:'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/',
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter valid url " + value)
            }
        }
    },
    skill:{
        type:["String"],
        validate(value){
            if(value.length > 10){
                throw new Error("Skill is allow only 10 not allow more 10")
            }
        }
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('user',userSchema)
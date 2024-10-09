const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save', async function(next){
    try{
        //hash password generate
        const person = this;
        if(!person.isModified('password'))return next();

        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(person.password,salt);
            person.password = hash;
        }catch(err){
            return next(err);
        }
        next();
    }catch(err){
        return next(err);
    }
    
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword,this.password);
    }catch(err){
        // return false;
        throw err;
    }
}

const Person = mongoose.model('Person',personSchema);
module.exports = Person
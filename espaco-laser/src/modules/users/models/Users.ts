import mongoose from "mongoose";

interface User {
    _id?:string;
    name:string;
    email:string;
    password:string;
    created_at:Date;
    updated_at:Date;
};

const userSchema = new mongoose.Schema<User>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true },
    password:{type:String,required:true},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
},
{versionKey: false});

const Users = mongoose.model("Users",userSchema);

export {User,Users}

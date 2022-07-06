import mongoose from "mongoose";

enum status {ALREADY_A_CUSTOMER = "Já é cliente", COMPETITION_CUSTOMER="Cliente da concorrência" , NOT_INTERESTED = "Não tem interesse"}

interface IContact{
    phone?:string;
    hasInterest?:boolean;
    needHelp?:boolean;
    search?:status;
}

interface Campaing {
    _id?:string;
    name:string;
    opportunities?:[IContact]
    created_at?:Date;
    updated_at?:Date;
};

const campaingSchema = new mongoose.Schema<Campaing>({
    name:{type:String,required:true,unique:true},
    opportunities: [{
        phone:{type:String,unique:true},
        hasInterest:{type:Boolean},
        needHelp:{type:Boolean},
        search:{type:String},
    }],
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
},
{versionKey: false});

const Campaings = mongoose.model("Campaings",campaingSchema);

export {Campaing,Campaings}

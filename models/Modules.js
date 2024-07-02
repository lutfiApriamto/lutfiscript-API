import mongoose from "mongoose";

const ModulesSchema = new mongoose.Schema({
    judul : {type : String, required: true},
    link : {type : String, required: true},
    desc : {type : String, required: true},
});

const ModulesModel = mongoose.model("Modules", ModulesSchema)

ModulesModel.init().then(() => {
    console.log("index created");
}).catch( err => console.log("Error creating Index : " , err));

export {ModulesModel as Modules}
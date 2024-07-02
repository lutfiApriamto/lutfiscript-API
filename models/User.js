import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type : String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    quiz : [{percoobaan:{type : Number} , quizname:{type : String}, score:{type : Number}}],
    suggestions:[{modulename : {type : String}, suggestion: {type : String}}]
});

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });  // Add this line

const UserModel = mongoose.model("User", UserSchema);

UserModel.init().then(() => {
    console.log("Indexes created");
}).catch(err => {
    console.error("Error creating indexes:", err);
});

export { UserModel as User };


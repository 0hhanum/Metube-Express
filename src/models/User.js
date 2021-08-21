import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    avatarUrl: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    name: { type: String, required: true },
    location: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

userSchema.pre("save", async function () {
    // user 가 save 되면 실행. 아래 코드로 password 가 변경되었을 때만 Hash 를 실행
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
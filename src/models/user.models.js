

    import mongoose from "mongoose";
    import bcrypt from "bcrypt"

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    }, { timestamps: true })

    userSchema.pre("save", async function (next) {
        const user = this;
        if (!user.isModified("password")) return
        const hashPassword = await bcrypt.hash(user.password, 10)
        user.password = hashPassword
        next()
    })


    export default mongoose.model("users", userSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userRoleSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],

    },
    password: {
        type: String,
        required: false  // not required because only admin user is able to login
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "UserRole",
        required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
}, { timestamps: true });

// method for password hashing,
// it's called automatically before document is saved to users collection
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        if (this.password)
            this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        return next(err);
    }
});

// method for checking if password is valid
userSchema.methods.isValidPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = { UserRole, User };
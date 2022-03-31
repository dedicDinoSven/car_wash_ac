const { UserRole, User } = require("../models/User");
const jwt = require("jsonwebtoken");

const create = async (data) => {
    const { firstName, lastName, email, password } = data;
    if (!firstName) throw new Error("First name is required!");
    if (!lastName) throw new Error("Last name is required!");
    if (!email) throw new Error("Email is required!");

    try {
        const user = await User.findOne({ email });
        if (user) throw new Error("User with given email already exists!");

        const customerRole = await UserRole.findOne({ name: "Customer" });

        return User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: customerRole._id
        });
    } catch (err) {
        throw err || "Error while creating new user!";
    }
};

const login = async (email, password) => {
    if (!email) throw new Error("Email is required!");
    if (!password) throw new Error("Password is required!");

    try {
        const user = await User.findOne({ email }, "-__v")
            .populate("role", "-__v");
        if (!user) throw new Error("User with given email does not exist!");

        const validatePassword = await user.isValidPassword(password);
        if (!validatePassword) throw new Error("Incorrect password!");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return { user, token };
    } catch (err) {
        throw err || "Error while trying to login!";
    }
};

const getAll = () => {
    return User.find({}, "-__v -password")
        .populate("role", "-__v");
};

const getById = (id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/))
            throw new Error("Invalid ID!");

        return User.findById(id, "-__v -password")
            .populate("role", "-__v");

    } catch (err) {
        throw err || "Error while trying to get user by ID!";
    }
};

const update = async (id, data) => {
    const allowedUpdates = ["firstName", "lastName", "email"];
    const fieldsForUpdate = Object.keys(data);

    const isValid = fieldsForUpdate.every(
        (field) => allowedUpdates.includes(field));

    if (!isValid)
        throw new Error(
            `Invalid field(s) for update! Allowed updates are first name, last name and email!`);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");

    if (!data.email) throw new Error("Email is required!");

    try {
        const existingUser = await User.findOne(
            { email: data.email, _id: { $ne: id } });

        if (existingUser) throw new Error("Email is used by someone else!");

        const user = await User.findByIdAndUpdate(id, data, { new: true })
            .populate("role", "-__v");

        if (!user) throw new Error("User does not exist!");

        return user;
    } catch (err) {
        throw err || "Error while trying to update user!";
    }
};

const remove = async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User does not exist!");

        return await User.deleteOne({ _id: id });
    } catch (err) {
        throw err || "Error while trying to delete user!";
    }
};

const UserService = {
    create,
    login,
    getAll,
    getById,
    update,
    remove
};

module.exports = UserService;
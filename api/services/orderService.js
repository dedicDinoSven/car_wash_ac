const Order = require("../models/Order");

const create = async (data) => {
    try {
        const userOrdersCount = await Order.count({ user: data.user });

        const program = await WashingProgramService.getById(data.program);

        //const order = new Order({});
        //await order.save();
        return { userOrdersCount, program };
    } catch (err) {
        throw err || "Error while creating new order!";
    }
};

const getAll = async () => {
    try {
        return await Order.find({}, "-__v")
            .populate("user", "-__v -password -orders -role")
            .populate("program", "-__v -steps");
    } catch (err) {
        throw err || "Error while fetching orders!";
    }
};

const getById = async (id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/))
            throw new Error("Invalid ID!");

        return Order.findById(id, "-__v")
            .populate("user", "-__v -password -orders -role")
            .populate({
                path: "program",
                select: "-__v",
                model: "WashingProgram",
                populate: {
                    path: "steps",
                    select: "-__v",
                    model: "ProgramSteps",
                }
            });
    } catch (err) {
        throw err || "Error while trying to get program by ID!";
    }
};

const update = async (id, data) => {
    const allowedUpdates = ["program", "discount", "priceToPay"];
    const fieldsForUpdate = Object.keys(data);

    const isValid = fieldsForUpdate.every(
        (field) => allowedUpdates.includes(field));

    if (!isValid)
        throw new Error(
            `Invalid field(s) for update! Allowed updates are program, discount and price!`);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");

    try {
        const order = await Order.findByIdAndUpdate(id, data,
            { new: true })
            .populate("user", "-__v -password -orders -role")
            .populate({
                path: "program",
                select: "-__v",
                model: "WashingProgram",
                populate: {
                    path: "steps",
                    select: "-__v",
                    model: "ProgramSteps",
                }
            });

        if (!order) throw new Error("Order does not exist!");

        return order;
    } catch (err) {
        throw err || "Error while trying to update program!";
    }
};

const remove = async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");
    try {
        const order = await Order.findById(id);
        if (!order) throw new Error("Order does not exist!");

        return await Order.deleteOne({ _id: id });
    } catch (err) {
        throw err || "Error while trying to delete order!";
    }
};

const WashingProgramService = {
    create,
    getAll,
    getById,
    update,
    remove
};

module.exports = WashingProgramService;
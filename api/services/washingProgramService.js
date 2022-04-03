const { ProgramStep, WashingProgram } = require("../models/WashingProgram");

const createStep = async (name) => {
    try {
        const existingStep = await ProgramStep.findOne({ name });
        if (existingStep)
            throw new Error("Step with given name already exists!");

        return ProgramStep.create({ name: name });
    } catch (err) {
        throw err || "Error while creating new program step!";
    }
};

const getAllSteps = async () => {
    return await ProgramStep.find({}, "-__v")
        .catch((err) => {
            throw err || "Error while fetching program steps!";
        });
};

const removeStep = async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");
    try {
        const step = await ProgramStep.findById(id);
        if (!step) throw new Error("Step does not exist!");

        return await ProgramStep.deleteOne({ _id: id });
    } catch (err) {
        throw err || "Error while trying to delete step!";
    }
};

const createProgram = async (data) => {
    try {
        const existingProgram = await WashingProgram.findOne(
            { name: data.name });
        if (existingProgram)
            throw new Error("Program with given name already exists!");

        const program = new WashingProgram({
            name: data.name,
            steps: data.steps,
            price: data.price
        });

        await program?.save();
        await program?.populate("steps", "-__v");
        return program;

    } catch (err) {
        throw err || "Error while creating new program!";
    }
};

const getAllPrograms = async () => {
    return await WashingProgram.find({}, "-__v")
        .populate("steps", "-__v")
        .catch((err) => {
            throw err || "Error while fetching programs!";
        });
};

const getProgramById = async (id) => {
    try {
        if (!id.match(/^[0-9a-fA-F]{24}$/))
            throw new Error("Invalid ID!");

        return WashingProgram.findById(id, "-__v").populate("steps", "-__v");
    } catch (err) {
        throw err || "Error while trying to get program by ID!";
    }
};

const updateProgram = async (id, data) => {
    const allowedUpdates = ["name", "steps", "price"];
    const fieldsForUpdate = Object.keys(data);

    const isValid = fieldsForUpdate.every(
        (field) => allowedUpdates.includes(field));

    if (!isValid)
        throw new Error(
            `Invalid field(s) for update! Allowed updates are name, steps and price!`);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");

    try {
        const existingProgram = await WashingProgram.findOne(
            { name: data.name, _id: { $ne: id } });

        if (existingProgram)
            throw new Error("Name is used for another program!");

        const program = await WashingProgram.findByIdAndUpdate(id, data,
            { new: true }).populate("steps", "-__v");

        if (!program) throw new Error("Program does not exist!");

        return program;
    } catch (err) {
        throw err || "Error while trying to update program!";
    }
};

const removeProgram = async (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) throw new Error("Invalid ID!");
    try {
        const program = await WashingProgram.findById(id);
        if (!program) throw new Error("Program does not exist!");

        return await WashingProgram.deleteOne({ _id: id });
    } catch (err) {
        throw err || "Error while trying to delete program!";
    }
};

const WashingProgramService = {
    createStep,
    getAllSteps,
    removeStep,
    createProgram,
    getAllPrograms,
    getProgramById,
    updateProgram,
    removeProgram
};

module.exports = WashingProgramService;
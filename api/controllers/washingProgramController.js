const WashingProgramService = require("../services/washingProgramService");

const createStep = async (req, res) => {
    try {
        const step = await WashingProgramService.createStep(req.body.name);

        res.status(201).send(step);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const removeStep = async (req, res) => {
    try {
        await WashingProgramService.removeStep(req.params.id);

        res.status(200).send({ message: "Step deleted successfully!" });
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const createProgram = async (req, res) => {
    try {
        const program = await WashingProgramService.createProgram(req.body);

        res.status(201).send(program);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const getAllPrograms = async (req, res) => {
    try {
        const programs = await WashingProgramService.getAllPrograms();

        res.status(200).send(programs);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const getProgramById = async (req, res) => {
    try {
        const program = await WashingProgramService.getProgramById(
            req.params.id);

        res.status(200).send(program);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const updateProgram = async (req, res) => {
    try {
        const program = await WashingProgramService.updateProgram(req.params.id,
            req.body);

        res.status(200).send(program);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const removeProgram = async (req, res) => {
    try {
        await WashingProgramService.removeProgram(req.params.id);

        res.status(200).send({ message: "Program deleted successfully!" });
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const WashingProgramController = {
    createStep,
    removeStep,
    createProgram,
    getAllPrograms,
    getProgramById,
    updateProgram,
    removeProgram
};

module.exports = WashingProgramController;
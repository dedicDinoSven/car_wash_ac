const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programStepSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const ProgramStep = mongoose.model("ProgramStep", programStepSchema);

const washingProgramSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        unique: true
    },
    steps: [{
        type: Schema.Types.ObjectId,
        ref: "ProgramStep"
    }],
    price: {
        type: Number,
        required: [true, "Price is required!"]
    }
});

const WashingProgram = mongoose.model("WashingProgram", washingProgramSchema);

module.exports = { ProgramStep, WashingProgram };
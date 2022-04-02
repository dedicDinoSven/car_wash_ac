const express = require("express");
const router = express.Router();
const WashingProgramController = require(
    "../controllers/washingProgramController");
const auth = require("../middleware/auth");

router.post("/step", auth, WashingProgramController.createStep);
router.delete("/step/:id", auth, WashingProgramController.removeStep);

router.get("/", auth, WashingProgramController.getAllPrograms);
router.get("/:id", auth, WashingProgramController.getProgramById);
router.post("/", auth, WashingProgramController.createProgram);
router.patch("/:id", auth, WashingProgramController.updateProgram);
router.delete("/:id", auth, WashingProgramController.removeProgram);

module.exports = router;
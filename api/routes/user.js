const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", auth, UserController.getAll);
router.get("/:id", auth, UserController.getById);
router.post("/", auth, UserController.create);
router.post("/login", UserController.login);
router.patch("/:id", auth, UserController.update);
router.delete("/:id", auth, UserController.remove);

module.exports = router;
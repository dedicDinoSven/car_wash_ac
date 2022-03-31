const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);
router.post("/login", UserController.login);
router.patch("/:id", auth, UserController.update);
router.delete("/:id", auth, UserController.remove);

module.exports = router;
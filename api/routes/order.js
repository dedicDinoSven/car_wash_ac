const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.get("/", auth, OrderController.getAll);
router.get("/:id", auth, OrderController.getById);
router.post("/", auth, OrderController.create);
router.patch("/:id", auth, OrderController.update);
router.delete("/:id", auth, OrderController.remove);

module.exports = router;
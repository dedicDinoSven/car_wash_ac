const Order = require("../services/orderService");

const create = async (req, res) => {
    try {
        const order = await Order.create(req.body);

        res.status(201).send(order);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const getAll = async (req, res) => {
    try {
        const orders = await Order.getAll();

        res.status(200).send(orders);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const getById = async (req, res) => {
    try {
        const order = await Order.getById(req.params.id);

        res.status(200).send(order);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const update = async (req, res) => {
    try {
        const order = await Order.update(req.params.id, req.body);

        res.status(200).send(order);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const remove = async (req, res) => {
    try {
        await Order.remove(req.params.id);

        res.status(200).send({
            _id: req.params.id,
            message: "Order deleted successfully!"
        });
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const OrderController = {
    create,
    getAll,
    getById,
    update,
    remove
};

module.exports = OrderController;
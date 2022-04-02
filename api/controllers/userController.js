const UserService = require("../services/userService");

const create = async (req, res) => {
    try {
        const user = await UserService.create(req.body);

        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserService.login(email, password);

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const getAll = async (req, res) => {
    try {
        const users = await UserService.getAll();

        res.status(200).send(users);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const getById = async (req, res) => {
    try {
        const user = await UserService.getById(req.params.id);

        res.status(200).send(user);
    } catch (err) {
        res.status(404).send({ message: err.message }).end();
    }
};

const update = async (req, res) => {
    try {
        const user = await UserService.update(req.params.id, req.body);

        res.status(200).send(user);
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const remove = async (req, res) => {
    try {
        await UserService.remove(req.params.id);

        res.status(200).send({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(400).send({ message: err.message }).end();
    }
};

const UserController = {
    create,
    login,
    getAll,
    getById,
    update,
    remove
};

module.exports = UserController;
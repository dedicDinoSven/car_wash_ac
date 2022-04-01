import Request from "./index";

class UserApi {
    static login(data) {
        return Request.post("/api/users/login", data);
    }

    static create(data) {
        return Request.post("/api/users", data);
    }

    static getAll() {
        return Request.get("/api/users");
    }

    static getById(id) {
        return Request.get(`/api/users/${id}`);
    }

    static update(id, data) {
        return Request.patch(`/api/users/${id}`, data);
    }

    static remove(id) {
        return Request.delete(`/api/users/${id}`);
    }
}

export default UserApi;
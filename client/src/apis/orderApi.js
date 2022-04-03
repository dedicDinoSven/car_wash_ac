import Request from "./index";

class OrderApi {
    static createOrder(data) {
        return Request.post("/api/orders", data);
    }

    static getAllOrders() {
        return Request.get("/api/orders");
    }

    static getOrderById(id) {
        return Request.get(`/api/orders/${id}`);
    }

    static updateOrder(id, data) {
        return Request.patch(`/api/orders/${id}`, data);
    }

    static removeOrder(id) {
        return Request.delete(`/api/orders/${id}`);
    }
}

export default OrderApi;
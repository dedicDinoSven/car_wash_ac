import Request from "./index";

class WashingProgramApi {

    static createStep(data) {
        return Request.post("/api/washing-programs/steps", data);
    }

    static getAllSteps() {
        return Request.get("/api/washing-programs/steps");
    }

    static removeStep(id) {
        return Request.delete(`/api/washing-programs/steps/${id}`);
    }

    static createProgram(data) {
        return Request.post("/api/washing-programs", data);
    }

    static getAllPrograms() {
        return Request.get("/api/washing-programs");
    }

    static getProgramById(id) {
        return Request.get(`/api/washing-programs/${id}`);
    }

    static updateProgram(id, data) {
        return Request.patch(`/api/washing-programs/${id}`, data);
    }

    static removeProgram(id) {
        return Request.delete(`/api/washing-programs/${id}`);
    }
}

export default WashingProgramApi;
import axios from "./axios";

export const getContent = async () => {
    try {
        const resp = await axios.get("/content");
        return resp;
    } catch (error) {
        return error;
    }
};

export const createContent = async (data) => {
    try {
        const resp = await axios.post("/content", data);
        return resp;
    } catch (error) {
        return error;
    }
};
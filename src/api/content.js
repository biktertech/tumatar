import axios from "./axios";

export const getContent = async () => {
    try {
        const resp = await axios.get("/content");
        return resp;
    } catch (error) {
        return error;
    }
};
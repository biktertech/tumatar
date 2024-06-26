import axios from "./axios";

export const registerUser = async (data) => {
    try {
        const resp = await axios.post("/client/signup", data);
        return resp;
    } catch (error) {
        return error;
    }
};
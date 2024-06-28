import axios from "./axios";

export const registerUser = async (data) => {
    try {
        const resp = await axios.post("/client/signup", data);
        return resp;
    } catch (error) {
        return error;
    }
};

export const loginUser = async (data) => {
    try {
        const resp = await axios.post("/auth/login", data);
        return resp;
    } catch (error) {
        return error;
    }
};

export const getUser = async () => {
    try {
        const resp = await axios.get("/user/profile");
        return resp;
    } catch (error) {
        return error;
    }
};
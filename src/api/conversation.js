import axios from "./axios";


export const getConversations = async (id) => {
    try {
        const resp = await axios.get(`/content/${id}/conversation`);
        return resp;
    } catch (error) {
        return error;
    }
};

export const getMessages = async (content_id,id) => {
    try {
        const resp = await axios.get(`/content/${content_id}/conversation/${id}`);
        return resp;
    } catch (error) {
        return error;
    }
};

export const sendMsg = async (id, data) => {
    try {
        const resp = await axios.post(`/content/${id}/conversation`, data);
        return resp;
    } catch (error) {
        return error;
    }
};
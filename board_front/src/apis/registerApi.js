import { instance } from "./util/instance";

export const registerApi = async(board) => {
    let response = null;
    try {
         response = instance.post("/board", board);
    } catch (error) {
         response = error.response
        console.error(error);
        
    }
    return response;
}
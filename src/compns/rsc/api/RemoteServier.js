import axios from "axios";

const server = process.env.API_SERVER || "https://quest-portal-backend.herokuapp.com";
export default axios.create({
    baseURL: server + "/api/v1",
});

export const WS_CROSS_ORIGIN = server + '/ws';


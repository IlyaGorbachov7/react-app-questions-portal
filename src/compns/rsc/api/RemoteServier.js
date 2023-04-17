import axios from "axios";

export default axios.create({
    baseURL: "https://quest-portal-backend.herokuapp.com/api/v1",
});

export const WS_CROSS_ORIGIN = 'https://quest-portal-backend.herokuapp.com/ws';


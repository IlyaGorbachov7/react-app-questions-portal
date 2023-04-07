import ax from "./RemoteServier";
import useToken from "../hooks/useToken";

export default class Requests {
    static getToken = () => {
        let tokenString = localStorage.getItem('token')
        if (tokenString === 'undefined') {
            tokenString = null
        }
        return JSON.parse(tokenString)
    }
    static config = {
        headers: {
            Authorization: "Bearer " + this.getToken()
        }
    }

    static async registration(registrationData) {
        const response = await ax.post("/users/register", registrationData);
        return response.data;
    }

    static async login(loginData) {
        const response = await ax.post("/users/login", loginData)
        return response.data;
    }

    static async resetPassword(resetData) {
        const response = await ax.post("/users/reset-password", resetData)
        return response.data;
    }

    static async changePassword(changeData) {
        const response = await ax.post("/users/change-password", changeData)
        return response.data;
    }

    static async curUser() {
        const response = await ax.get("/users/cur-user", this.config)
        return response.data;
    }
}
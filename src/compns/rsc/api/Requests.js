import ax from "./RemoteServier";
import useToken from "../hooks/useToken";
import axios from "axios";

export default class Requests {
    static getToken = () => {
        let tokenString = localStorage.getItem('token')
        if (tokenString === 'undefined') {
            tokenString = null
        }
        return JSON.parse(tokenString)
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

    static async delete(deleteData) {
        const response = await ax.delete("/users/cur-user", {
            data: deleteData,
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async updateCurUser(updateData) {
        const response = await ax.put("/users/cur-user", updateData, {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async curUser() {
        const response = await ax.get("/users/cur-user", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }
}
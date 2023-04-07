import ax from "./RemoteServier";
import useToken from "../hooks/useToken";

export default class Requests {

    static async registration(registrationData) {
        const response = await ax.post("/users/register", registrationData);
        return response.data;
    }

    static async login(loginData) {
        const response = await ax.post("/users/login", loginData,)
        return response.data;
    }


    static async curUser() {
        const response = await ax.get("/users/cur-user", {
            headers: {
                // Authorization: "Bearer " + token
            }
        })
        return response.data;
    }
}
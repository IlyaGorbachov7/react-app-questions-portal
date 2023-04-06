import ax from "./RemoteServier";

const config = {
    // причина ошибки в том, что у меня на backend-е Access-Control-Allow-Credentials => не позволяет передавать cookies и другие учетные данные пользователя
    // А на front-end я делаю withCredentials == true, что не соответцтвует условию на bake
    withCredentials: true, // нет ture => a false
    // credentials: 'include',
    headers: {
        // "Access-Control-Allow-Credentials": true,
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json'
    }
}
export default class Requests {


    static async registration(registrationData) {
        const response = await ax.post("/api/v1/users/register", registrationData, {
            withCredentials: false
        });
        return response.data;
    }

    d

    static async login(loginData) {
        const response = await ax.post("/users/login", loginData,
            {
                withCredentials: false
            })
    }
}
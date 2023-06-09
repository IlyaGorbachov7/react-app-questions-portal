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

    static getTokenWithBearer() {
        return 'Bearer ' + Requests.getToken();
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

    static async receiveEmails() {
        const response = await ax.get("/users/emails", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

// -----------------------------------------------------------------------------------------
    static async receiveAllAnswerTypes() {
        const response = await ax.get("/answer-types/", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

//------------------------------------------------------------------------------------------

    static async createQuestion(newQuest) {
        const response = await ax.post("/questions/", newQuest, {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async updateQuestion(quest) {
        const response = await ax.put("/questions/", quest, {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async answerTheQuestion(quest) {
        debugger
        const response = await ax.patch("/questions/", quest, {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response;
    }

    static async deleteQuestion(id) {
        const response = await ax.delete("/questions/" + id, {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async getTotalCountYourQuest() {
        const response = await ax.get("/questions/from-me/quantity", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async getTotalCountAnswerQuest() {
        const response = await ax.get("/questions/for-me/quantity", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async getCountQuestFromToForUser(forUser) {
        const response = await ax.get("/questions/from-me/" + forUser + "/quantity", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        debugger
        return response.data;
    }

    static async getAllYourQuestions() {
        const response = await ax.get("/questions/from-me/all", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }


    static async getAllAnswerQuestions() {
        const response = await ax.get("/questions/for-me/all", {
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async getYourQuestionsPage(page, limit) {
        const response = await ax.get("/questions/from-me", {
            params: {
                page: page,
                limit: limit
            },
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }

    static async getAnswerQuestionsPage(page, limit) {
        const response = await ax.get("/questions/for-me", {
            params: {
                page: page,
                limit: limit
            },
            headers: {
                Authorization: "Bearer " + this.getToken()
            }
        })
        return response.data;
    }
}
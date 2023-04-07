import React, {useState} from 'react'


const useToken = () => {
    const getToken = () => {
        let tokenString = localStorage.getItem('token')
        if (tokenString === 'undefined') {
            tokenString = null
        }
        return JSON.parse(tokenString)
    }

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken)
    }
    const clearToken = () => {
        localStorage.removeItem('token')
    }
    return [
        token,
        saveToken,
        clearToken,
    ];
}

export default useToken;
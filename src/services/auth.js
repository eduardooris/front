import { http, storeToken, accessTokenKey } from "./http"

export const login = async ({ username, password }) => {
    try {
        const response = await http({ method: "POST", url: "auth/login", body: { username, password } })
        if (response.accessToken) {
            storeToken(accessTokenKey, response.accessToken)
            return response
        }

        throw new Error("Failed to login")
    } catch (error) {
        return error
    }
}

export const register = async ({ username, password, email, name, surname }) => {
    try {
        const response = await http({ method: "POST", url: "auth/register", body: { username, password, email, name, surname } })
        if (response.accessToken) {
            return response
        }
        throw new Error("Failed to register")

    } catch (error) {
        return error
    }
}

export const logout = async () => {
    try {
        const response = await http({ method: "POST", url: "auth/logout" })
        if (response.ok) {
            return response
        }
        throw new Error("Failed to logout")

    } catch (error) {
        return error
    }
}


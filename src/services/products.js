import { http } from "./http"

export const getProducts = async () => {
    try {
        const response = await http({ method: "GET", url: "products" })
        if (response) {
            return response
        }
        throw new Error("Failed to get products")
    } catch (error) {
        return error
    }
}

export const getProduct = async ({ id }) => {
    try {
        const response = await http({ method: "GET", url: `products/${id}` })
        if (response) {
            return response
        }
        throw new Error("Failed to get product")

    } catch (error) {
        return error
    }
}

export const createProduct = async ({ name, description, price }) => {
    try {
        const response = await http({ method: "POST", url: "products", body: { name, description, price } })
        if (response) {
            return response
        }
        throw new Error("Failed to create product")

    } catch (error) {
        return error
    }
}

export const updateProduct = async ({ id, name, description, price }) => {
    try {
        const response = await http({ method: "PUT", url: `products/${id}`, body: { name, description, price } })
        if (response) {
            return response
        }
        throw new Error("Failed to update product")

    } catch (error) {
        return error
    }
}

export const deleteProduct = async ({ id }) => {
    try {
        const response = await http({ method: "DELETE", url: `products/${id}` })
        if (response) {
            return response
        }

        throw new Error("Failed to delete product")

    } catch (error) {
        return error
    }
}
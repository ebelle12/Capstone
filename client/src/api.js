const API_URL = "http://localhost:3000/api";

export async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const result = await response.json();
        return result;

    } catch (err) {
        console.error(err);
    }
}
export async function getProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();
        return result;

    } catch (err) {
        console.error(err);
    }
}

export async function getSingleProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();
        return result;

    } catch (err) {
        console.error(err);
    }
}

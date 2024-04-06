const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp/api";

export async function getBooks() {
    try {
        const response = await fetch(`${API_URL}/books`)
        const results = await response.json();
        return results.books;
    } catch (error) {
        console.error(error)
    }

}

export async function getBook(bookId) {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}`)
        const results = await response.json();
        return results.book;
    } catch (error) {
        console.error(error)
    }

}


export async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const results = await response.json();
        return results.user;
    } catch (error) {
        console.error(error)
    }

}

export async function login(userData) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(userData)
        })
        const results = await response.json();
        return results.token;
    } catch (error) {
        console.error(error)
    }

}


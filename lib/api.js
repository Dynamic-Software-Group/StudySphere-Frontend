const axios = require('axios');
const baseUrl = 'http://localhost:8080/api/v1';

export async function login(email, password) {
    try {
        const res = await axios.post(`${baseUrl}/auth/login`, {
            email,
            password
        });
        return res.data.token;
    } catch (error) {
        return null;
    }
}

export async function signup(email, password, username) {
    try {
         await axios.post(`${baseUrl}/auth/signup`, {
            email,
            password,
            username
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function getNotes(token) {
    try {
        const res = await axios.get(`${baseUrl}/notecard/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                token: token
            }
        });
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function createCategory(name, token) {
    try {
        await axios.post(`${baseUrl}/notecard/create_category`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                name: name,
                token: token
            }
        });
        return true;
    } catch (error) {
        // it will throw a 409 error if the category already exists, so we can ignore it
        return true;
    }
}
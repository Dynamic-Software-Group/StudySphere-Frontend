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
        console.error(error);
        return null;
    }
}

export async function signup(email, password, username) {
    try {
        const res = await axios.post(`${baseUrl}/auth/signup`, {
            email,
            password,
            username
        });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getNotes(token) {
    try {
        const res = await axios.get(`${baseUrl}/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            token
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
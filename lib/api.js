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

export async function createCategory(name, token) { // Have to use vanilla fetch here because axios isn't forwarding the headers correctly
    try {
        await fetch(`${baseUrl}/notecard/create_category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                token
            })
        });
        return true;
    } catch (error) {
        // it will throw a 409 error if the category already exists, so we can ignore it
        return true;
    }
}

export async function listCategories(token) {
    try {
        const res = await axios.get(`${baseUrl}/notecard/list_categories`, {
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

export async function createNotecard(name, category, token) {
    try {
        const res = await fetch(`${baseUrl}/notecard/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                category,
                token
            })
        });

        return res.data.id;
    } catch (error) {
        return null;
    }
}

export async function getNotecard(id, token) {
    try {
        const res = await fetch(`${baseUrl}/notecard/get?token=${token}?&notecardId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        return await res.json();
    } catch (error) {
        console.error('Error fetching notecard:', error);
        return null;
    }
}


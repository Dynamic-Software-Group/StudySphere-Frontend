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
        // check if error is 403
        if (error.response.status === 401 && error.response.data.message === 'Email not verified') {
            return 'Email not verified';
        }
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

export async function getFavorites(token) {
    try {
        const res = await fetch(`${baseUrl}/notecard/favorites?token=${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return null;
    }
}

export async function sendVerificationEmail(email) {
    try {
        await fetch(`${baseUrl}/auth/request_verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email
            });
          )};
    } catch (error) {
    }
}

export async function favoriteNotecard(id, token) {
    try {
        await fetch(`${baseUrl}/notecard/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                notecardId: id,
                token: token
            })
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function summarize(token, notecardContents, notecardId) {
    try {
        console.log(token, notecardContents, notecardId)
        const res = await fetch(`${baseUrl}/notecard/summarize`, {
                token,
                notecardContents,
                notecardId
            })
        });

        if (res.status === 418) {
            return 'Quota';
        }
  
        return true;
    } catch (error) {
        return false;
    }
}

export async function unfavoriteNotecard(id, token) {
    try {
        await fetch(`${baseUrl}/notecard/unfavorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                notecardId: id,
                token: token
            })
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function deleteNotecard(id, token) {
    try {
        await fetch(`${baseUrl}/notecard/delete?token=${token}&notecardId=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        return true;
    } catch (error) {
        console.error('Error deleting notecard:', error);
        return false;
    }
}

export async function getShared(token) {
    try {
        const res = await axios.get(`${baseUrl}/notecard/list_shared?token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function shareNotecard(token, id, email) {
    try {
        const res = await fetch(`${baseUrl}/notecard/share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                notecardId: id,
                email,
                token
            })
        });

        if (res.status === 409) {
            return "already shared";
        }

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error sharing notecard:', error);
        return false;
    }
}

export async function getCollaborators(token, id) {
    try {
        const res = await axios.get(`${baseUrl}/notecard/collaborators?token=${token}&notecardId=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        return null;
    }
}

export async function checkJWT(token) {
    try {
        const res = await axios.get(`${baseUrl}/auth/check?token=${token}`);
        return true;
    } catch (error) {
        return false;
    }
}

export async function unarchiveNotecard(token, id) {
    try {
        await fetch(`${baseUrl}/notecard/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                token,
                notecardId: id
            })
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function updateUser(updateReq) {
    try {
        const res = await fetch(`${baseUrl}/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${updateReq.token}`
            },
            body: JSON.stringify(
                updateReq
            )
        });

        return res.ok;
    } catch (error) {
        return false;
    }
}

export async function getUser(token) {
    try {
        const res = await axios.get(`${baseUrl}/user/get?token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {

        return null;
    }
}
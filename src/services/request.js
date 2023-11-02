import axios from "axios";

// POST: Petición de Autenticación
const loginRequest = async (formState) => {
    try {
        const response = await axios.post('https://exps-mvc-api.vercel.app/api/login', {
            ...formState
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// GET: Petición para obtener los datos de las vacas
const getCowsRequest = async (token) => {
    try {
        const response = await axios.get('https://exps-mvc-api.vercel.app/api/cows', {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// POST: Petición para agregar una nueva vaca
const postCowsRequest = async (formState, token) => {
    try {
        const response = await axios.post('https://exps-mvc-api.vercel.app/api/cows', {
            ...formState
        }, {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// PUT: Petición para agregar una nueva vaca
const putCowsRequest = async (formState, token) => {
    try {
        const response = await axios.put('https://exps-mvc-api.vercel.app/api/cows', {
            ...formState
        }, {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

const deleteCowsRequest = async (cowID, token) => {
    try {
        const response = await axios.delete(`https://exps-mvc-api.vercel.app/api/cows/${cowID}`, {
            headers: {
                Authorization: token,
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export { loginRequest, getCowsRequest, postCowsRequest, putCowsRequest, deleteCowsRequest }
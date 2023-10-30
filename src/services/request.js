import axios from "axios";

// POST: Login Request
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

export { loginRequest }
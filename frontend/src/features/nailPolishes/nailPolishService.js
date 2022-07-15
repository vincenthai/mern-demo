import axios from 'axios';

const API_URL = '/api/nail-polish/';

// Create nail polish
const createNailPolish = async (nailPolishData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, nailPolishData, config);

    return response.data;
};

// Get nail polishes
const getNailPolishes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete nail polish
const deleteNailPolish = async (nailPolishId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + nailPolishId, config);

    return response.data;
};

const nailPolishService = {
    createNailPolish,
    getNailPolishes,
    deleteNailPolish
}

export default nailPolishService;
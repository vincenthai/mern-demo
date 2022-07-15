import axios from 'axios';

const API_URL = '/api/patterns/';

// Create pattern
const createPattern = async (patternData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, patternData, config);

    return response.data;
};

// Get patterns
const getPatterns = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Delete pattern
const deletePattern = async (patternId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + patternId, config);

    return response.data;
};

const patternService = {
    createPattern,
    getPatterns,
    deletePattern
}

export default patternService;
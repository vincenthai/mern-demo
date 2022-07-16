import axios from 'axios';

const API_URL = '/api/randomize/';

// get nail polish combo
const getNailPolishCombo = async (type, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, type, config);

    return response.data;
};

const randomizerService = {
    getNailPolishCombo,
}

export default randomizerService;
import axios from 'axios';

export const fetchGameData = async () => {
    try {
        const response = await axios.get('https://localhost:44392/games');

        return response;
    } catch (error) {
        console.log(error);
    }
}

export const fetchFrameData = async () => {
    try {
        const response = await axios.get('https://localhost:44392/frames');

        return response;
    } catch (error) {
        console.log(error);
    }
}
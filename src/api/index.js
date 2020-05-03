import axios from 'axios';

export const fetchGameData = async () => {
    try {
        const { data } = await axios.get('https://localhost:44392/games');

        return Array.from(data);
    } catch (error) {
        console.log(error);
    }
}

export const fetchFrameData = async () => {
    try {
        const { data } = await axios.get('https://localhost:44392/frames');
        
        return Array.from(data);
    } catch (error) {
        console.log(error);
    }
}
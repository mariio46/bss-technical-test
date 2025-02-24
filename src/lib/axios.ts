import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_APP_URL,
    headers: {
        Accept: 'application/json',
    },
});

const axiosServer = Axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export { axiosClient, axiosServer };

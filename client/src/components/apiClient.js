import axios, {AxiosInstance} from 'axios';

const createClient: () => AxiosInstance = () => {
    const options = {
        baseURL: process.env.REACT_APP_API_URL,
        responseType: 'json',        
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': ''
        },
    };

    const instance = axios.create(options);

    // Set the AUTH token for any request
    // ref: https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests
    instance.interceptors.request.use(function (config) {        
        const token = localStorage.getItem('USER_JWT_TOKEN');
        config.headers.Authorization = token ? `Bearer ${token}` : '';     

        return config;
    });

    return instance;
};

export default createClient();
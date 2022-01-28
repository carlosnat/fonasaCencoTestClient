import * as axios from 'axios'

const xhrService = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
});

export default xhrService
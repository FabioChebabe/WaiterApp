import axios from 'axios';
import { apiUrl } from '../constants/api';

export const api = axios.create({
    baseURL: apiUrl,
});

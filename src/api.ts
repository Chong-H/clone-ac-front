import axios from 'axios';
import { DigitalCollectible } from './pojo/DigitalCollectible';

const API_BASE_URL = '/api';

// DigitalCollectible API
export const createCollectible = async (collectible: DigitalCollectible) => {
    const response = await axios.post(`${API_BASE_URL}/collectibles`, collectible);
    return response.data;
};

export const updateCollectible = async (id: number, collectible: DigitalCollectible) => {
    const response = await axios.put(`${API_BASE_URL}/collectibles/${id}`, collectible);
    return response.data;
};

export const deleteCollectible = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getCollectibleById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getAllCollectibles = async () => {
    const response = await axios.get(`${API_BASE_URL}/collectibles`);
    return response.data;
};

// User API
export const createUser = async (user: any) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};

export const updateUser = async (id: number, user: any) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log(response.data);
    return response.data;
};
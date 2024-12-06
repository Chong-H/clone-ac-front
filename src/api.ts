import axios from 'axios';
import { DigitalCollectibleCreate } from './pojo/DigitalCollectibleCreate';
import { UserLoginDto } from './pojo/dto/UserLoginDto';

const API_BASE_URL = '/api';

// DigitalCollectible API
export const createCollectibleAPI = async (collectible: DigitalCollectibleCreate) => {
    const response = await axios.post(`${API_BASE_URL}/collectibles`, collectible);
    return response.data;
};

export const updateCollectibleAPI = async (id: number, collectible: DigitalCollectibleCreate) => {
    const response = await axios.put(`${API_BASE_URL}/collectibles/${id}`, collectible);
    return response.data;
};

export const deleteCollectibleAPI = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getCollectibleByIdAPI = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getAllCollectiblesAPI = async () => {
    const response = await axios.get(`${API_BASE_URL}/collectibles`);
    return response.data;
};

export const getCollectibleOwnerById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/collectibles/${id}/owner`);
    return response.data;
}

// User API
export const createUserAPI = async (user: any) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};

export const updateUserAPI = async (id: number, user: any) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUserAPI = async (id: number) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getUserByIdAPI = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getAllUsersAPI = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log(response.data);
    return response.data;
};

export const userLoginAPI = async (user: UserLoginDto) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, user);
    return response.data;
}
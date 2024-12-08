import axios from 'axios';
import { User } from './pojo/User';
import { ResponseMessage } from './pojo/ResponseMessage';
import { UserLoginDto } from './pojo/dto/UserLoginDto';
import { DigitalCollectible } from './pojo/DigitalCollectible';

const API_BASE_URL = '/api';

// DigitalCollectible API
export const createCollectibleAPI = async (collectible: DigitalCollectible): Promise<ResponseMessage<DigitalCollectible>> => {
    const response = await axios.post(`${API_BASE_URL}/collectibles`, collectible);
    return response.data;
};

export const updateCollectibleAPI = async (id: number, collectible: DigitalCollectible): Promise<ResponseMessage<DigitalCollectible>> => {
    const response = await axios.put(`${API_BASE_URL}/collectibles/${id}`, collectible);
    return response.data;
};

export const deleteCollectibleAPI = async (id: number): Promise<ResponseMessage<null>> => {
    const response = await axios.delete(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getCollectibleByIdAPI = async (id: number): Promise<ResponseMessage<DigitalCollectible>> => {
    const response = await axios.get(`${API_BASE_URL}/collectibles/${id}`);
    return response.data;
};

export const getAllCollectiblesAPI = async (): Promise<ResponseMessage<DigitalCollectible[]>> => {
    const response = await axios.get(`${API_BASE_URL}/collectibles`);
    return response.data;
};

export const updateCollectibleStatusAPI = async (id: number, status: string): Promise<ResponseMessage<DigitalCollectible>> => {
    const response = await axios.put(`${API_BASE_URL}/collectibles/${id}/status`, { status });
    return response.data;
};

// User API
export const createUserAPI = async (user: any): Promise<ResponseMessage<User>> => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};

export const updateUserAPI = async (id: number, user: any): Promise<ResponseMessage<User>> => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUserAPI = async (id: number): Promise<ResponseMessage<null>> => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getUserByIdAPI = async (id: number): Promise<ResponseMessage<User>> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const getAllUsersAPI = async (): Promise<ResponseMessage<User[]>> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    console.log(response.data);
    return response.data;
};

export const userLoginAPI = async (user: UserLoginDto): Promise<ResponseMessage<string>> => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, user, { withCredentials: true });
    return response.data;
};

export const logoutAPI = async (): Promise<ResponseMessage<string>> => {
    const response = await axios.post(`${API_BASE_URL}/users/logout`);
    return response.data;
};

export const getSessionUserAPI = async (): Promise<ResponseMessage<number>> => {
    const response = await axios.post(`${API_BASE_URL}/users/session`);
    return response.data;
};
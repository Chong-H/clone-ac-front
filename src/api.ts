import axios from 'axios';
import { User } from './pojo/User';
import { ResponseMessage } from './pojo/ResponseMessage';
import type { ApiResponse } from './pojo/apiTransactionResponse';
import { UserLoginDto } from './pojo/dto/UserLoginDto';
import { DigitalCollectible } from './pojo/DigitalCollectible';
import type { TransactionDto } from './pojo/dto/TransactionDto';
import type { Transaction } from './pojo/Transaction';
//import { TransactionDto } from './pojo/dto/TransactionDto';
//import { Transaction } from './pojo/Transaction';

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


// Transaction API
// export const getAllTransactions = async () => {
//     const response = await axios.get(`${API_BASE_URL}/Transaction`)
//     return response.data;
// };

// export const addTransaction = async (transactionData: TransactionDto): Promise<ResponseMessage<number>> => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/transaction`, transactionData);
//         return response.data as ResponseMessage<number>;
//     } catch (error) {
//         console.error('添加交易记录失败:', error);
//         throw error;
//     }
// };
export const addTransaction = async (transactionData: TransactionDto): Promise<ResponseMessage<TransactionDto>> => {
    try {
        // 使用POST方法发送请求，并将transactionData作为请求体

        transactionData.transactionDate = getFormattedDate();
        const response = await axios.post(`${API_BASE_URL}/transaction`, transactionData);
        // 假设后端返回的JSON可以直接转换为ResponseMessage实例
        // 注意：这里不需要手动创建ResponseMessage实例，因为后端已经返回了完整的ResponseMessage对象
        return response.data as ResponseMessage<TransactionDto>;
    } catch (error) {
        console.error('添加交易记录失败:', error);
        throw error;
    }



};


export const findTransaction = async (buyerId: Number): Promise<ResponseMessage<TransactionDto>> => {
    try {
        // 使用POST方法发送请求，并将transactionData作为请求体

        const response = await axios.get(`${API_BASE_URL}/transaction/${buyerId}`);
        // 假设后端返回的JSON可以直接转换为ResponseMessage实例
        // 注意：这里不需要手动创建ResponseMessage实例，因为后端已经返回了完整的ResponseMessage对象
        return response.data as ResponseMessage<TransactionDto>;
    } catch (error) {
        console.error('获取交易记录失败:', error);
        throw error;
    }



};
export const editTransaction = async (transactionData: TransactionDto): Promise<ResponseMessage<TransactionDto>> => {
    try {
        // 使用POST方法发送请求，并将transactionData作为请求体
        const now = new Date();
        const nowString = now.toISOString();
        //transactionData.transactionDate=nowString;
        const response = await axios.put(`${API_BASE_URL}/transaction/change`, transactionData);
        // 假设后端返回的JSON可以直接转换为ResponseMessage实例
        // 注意：这里不需要手动创建ResponseMessage实例，因为后端已经返回了完整的ResponseMessage对象
        return response.data as ResponseMessage<TransactionDto>;
    } catch (error) {
        console.error('添加交易记录失败:', error);
        throw error;
    }
}


export const getAllTransactions = async (): Promise<ResponseMessage<Iterable<TransactionDto>>> => {
    try {
        // 使用GET方法发送请求，不需要传递任何参数
        const response = await axios.get(`${API_BASE_URL}/transaction`);
        // 假设后端返回的JSON可以直接转换为ResponseMessage实例
        return response.data as ResponseMessage<Iterable<TransactionDto>>;
    } catch (error) {
        console.error('获取所有交易记录失败:', error);
        throw error;
    }
};

function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const localDateString = `$DateIs-${year}-${month}-${day}at${hours}:${minutes}:${seconds}`;
    return localDateString;
}

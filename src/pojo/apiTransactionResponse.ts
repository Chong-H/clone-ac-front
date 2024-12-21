// src/pojo/apiResponse.ts

// 定义一个新的接口，描述后端返回的JSON结构
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}
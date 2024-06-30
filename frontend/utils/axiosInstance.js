import axios from "axios";

export const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const getErrorMessage = (error) => {
    let message;

    if (axios.isAxiosError(error)) {
        const statusCode = error?.response?.status;
        if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
            message = error?.response?.data?.message || error?.message;
        } else {
            message = "Something went wrong";
        }
    }

    return message;
};
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategoryList = async () => {
    return await axios.get(`${API_BASE_URL}/category-list`);
};

export const getJokeByDefault = async () => {
    return await axios.get(`${API_BASE_URL}/`);
};

export const getJokeByCategory = async (category: string) => {
    return await axios.get(`${API_BASE_URL}/${category}`);
};
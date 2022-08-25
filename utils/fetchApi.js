import axios from "axios"

export const fetchApi = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://restcountries.com/v3.1/'
    })
    return axiosInstance
}
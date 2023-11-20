import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useStore } from 'store'
// async function CustomAxios(config: AxiosRequestConfig) {
//     return axios.post(config.url, config.data)
// }
// const instance = axios.create();

const instance = axios.create({})

const AxiosInterceptor = ({ children }) => {
    const {
        dispatch
    } = useStore()
    useEffect(() => {

        const reqAcceptIntercepter = config => {
            dispatch({ type: 'setLoading', payload: { value: true, theme: "shadow" } })
            return config;
        }

        const resAcceptIntercepter = res => {
            dispatch({ type: 'setLoading', payload: { value: false, theme: "shadow" } })
            return res;
        }

        const errorInterceptor = error => {
            dispatch({ type: 'setLoading', payload: { value: false, theme: "shadow" } })
            return Promise.reject(error);
        }




        const reqinterceptor = instance.interceptors.request.use(reqAcceptIntercepter, errorInterceptor);
        const resInterceptor = instance.interceptors.response.use(resAcceptIntercepter, errorInterceptor);

        return () => {

            instance.interceptors.response.eject(resInterceptor);
            instance.interceptors.request.eject(reqinterceptor);
        }

    }, [])
    return children;
}
// axios.interceptors.request.use(function (config) {
//     const {
//         dispatch
//     } = useStore()
//     dispatch({ type: 'setLoading', payload: { value: true } })
//     return config
// })

// axios.interceptors.response.use(function (config) {
//     const {
//         dispatch
//     } = useStore()
//     dispatch({ type: 'setLoading', payload: { value: false } })
//     return config
// })
export default instance;
export { AxiosInterceptor }
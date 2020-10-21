import axios from 'axios'
import qs from 'qs'
import tokenService from './token-service.js'
import {actionLoginForm} from "../login/apiLogin";
import {getJson, setItem} from "../utils/local-storage";
import {API_TOKEN, USER_INFO} from "../constants/storage-key";

export const create = (options) => {
    let configs = Object.assign({}, options, {
        transformRequest: [
            (data, headers) => {
                headers.common = {};
                if (tokenService.isExpired()) {
                    getTokenInfo().then()
                }
                if (options && options.requester) {
                    headers.common.requester = options.requester
                }
                if (tokenService.getToken()) {
                    headers.common.Authorization = 'Bearer ' + tokenService.getToken()
                }
                return data
            },
        ]
    })

    configs.baseURL = 'http://192.168.19.212:16253'
    const instance = axios.create(configs);

    instance.interceptors.request.use(function (config) {
        let data = config.data;
        if (typeof data === "object" && !(data instanceof FormData)) {
            let nextData = Object.assign({}, data);
            return Object.assign({}, config, {
                data: qs.stringify(nextData)
            })
        }
        return config;
    });

    instance.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        return onImsApiRequestIsRejected(error)
    });

    return instance;
}

const getTokenInfo = () => {
    const dataInfo = getJson(USER_INFO)
    return actionLoginForm(qs.stringify(dataInfo)).then(res => {
        const {access_token} = res.data
        const {data} = res
        data.expires_in = new Date().getTime() + (30 * 60 * 1000)
        setItem(API_TOKEN, data)
        tokenService.setToken(data)
        return access_token
    })
}

const onImsApiRequestIsRejected = (error) => {
    if (error && error.response && error.response.status === 401) {
        window.location.reload()
    }
    return Promise.reject();
}
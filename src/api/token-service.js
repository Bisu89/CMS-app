import { getJson } from '../utils/local-storage.js';
import {API_TOKEN} from "../constants/storage-key";

let callbacks = [];

let token = getJson(API_TOKEN);

const onChange = (cb) => {
    callbacks.push(cb);
    return () => {
        callbacks = callbacks.filter(f => f !== cb)
    }
}

const emitChange = () => {
    callbacks.forEach(f => f(getToken()))
}

const setToken = (newToken) => {
    if (newToken) {
        token = Object.assign({}, token, newToken);
        //setItem(API_TOKEN, token);
    } else {
        return expireToken();
    }
    emitChange();
}

const expireToken = () => {
    token = null;
    //removeItem(API_TOKEN);
    emitChange();
}

const getToken = () => {
    return token && token.access_token
}

const getCurrentUserInfo = () => {
    return token && token.userInfo;
}

const getTokenInfo = () => {
    return token;
}

const isExpired = () => {
    if (!token || token.isExpired) return true;
    let {expires_in} = token;
    let time = new Date().getTime();
    return time >= parseInt(expires_in);
}

const getNewToken = (getTokenFunction) => {
    return new Promise((resolve, reject) => {

        if (typeof getTokenFunction != "function") {
            reject();
            return;
        }

        getTokenFunction((error, newToken) => {
            if (error || !newToken) {
                reject()
                return;
            }
            token = Object.assign({}, token, newToken);
            //setItem(API_TOKEN, token);

            resolve(token);
        })
    })
}

const tokenService = {
    onChange,
    getToken,
    getTokenInfo,
    setToken,
    expireToken,
    isExpired,
    getCurrentUserInfo,
    getNewToken,
}


export default tokenService;

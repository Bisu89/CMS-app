import axios from 'axios';

export const actionLoginForm = (data) => {
    const url = 'http://192.168.19.212:16253/_api/token'
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, data
    })
}
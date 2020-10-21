import {useEffect} from "react";
import tokenService from "../api/token-service";
import {getJson, setItem} from "../utils/local-storage";
import {API_TOKEN, USER_INFO} from "../constants/storage-key";
import {actionLoginForm} from "../login/apiLogin";
import qs from "qs";

function Token() {

    useEffect(() => {
        const interval = setInterval(() => {
            setToken()
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    function setToken() {
        if (tokenService.isExpired()) {
            const dataInfo = getJson(USER_INFO)
            actionLoginForm(qs.stringify(dataInfo)).then(res => {
                const {data} = res
                data.expires_in = new Date().getTime() + (30 * 60 * 1000)
                setItem(API_TOKEN, data)
                tokenService.setToken(data)
            })
        }
        return null
    }

    return null
}

export default Token
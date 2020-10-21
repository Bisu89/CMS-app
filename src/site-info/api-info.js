import {create} from "../api/api-axios";
import safeInvoke from "../utils/safeInvoke";

let instance;
const getInstance = () => {
    if (!instance) {
        instance = create({
            baseURL: '/'
        })
    }
    return instance;
}

export const getListSiteInfo = (data) => {
    return getInstance().post('api/siteinfo/fetch_list_site_info', data).then(res => res.data)
}

export const saveDataSiteInfo = (data) => {
    return getInstance().post('api/siteinfo/save_site_info', data).then(res => res.data)
}

export const getInfoConfig = (params) => {
    return getInstance().get('api/config/get_all_config_by_siteid', {params}).then(res => res.data)
}

export const getGroupConfig = () => {
    return getInstance().get('api/group/get_all_group_name', {}).then(res => res.data)
}

export const getInfoConfigById = (params) => {
    return getInstance().get('api/group/fetch_config_in_group', {params}).then(res => res.data)
}


export const saveAllConfigInfo = (data) => {
    return getInstance().post('api/config/save_config_to_site', data).then(res => res.data)
}


export const saveRowConfig = (data) => {
    return getInstance().post('api/config/save_config', data).then(res => res.data)
}

export const deleteConfigById = (params) => {
    return getInstance().get('api/config/delete_config', {params}).then(res => res.data)
}

export const getListAccountAdmin = (params) => {
    return getInstance().get('api/siteinfo/get_list_account', {params}).then(res => res.data)
}

export const getInfoListSite = (params) => {
    return getInstance().get('api/siteinfo/get_site_info', {params}).then(res => res.data)
}

export const getManagerToken = (callback) => {
    const params = {username: 'user_api_admin'}
    return getInstance().get('/api/system/media_token', {params: params}).then(res => {
        if (!res || !res.data) {
            return Promise.reject(res && res.Message);
        }
        const {Data} = res.data;
        if (!Data || !Data.token) {
            return Promise.reject();
        }
        return Promise.resolve(Data.token);

    })
        .then(token => {
            safeInvoke(callback, token);
        })
        .catch(() => {
            safeInvoke(callback, null);
        })
}

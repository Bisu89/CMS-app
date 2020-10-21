import {create} from "../api/api-axios";

let instance;
const getInstance = () => {
    if (!instance) {
        instance = create({
            baseURL: '/'
        })
    }
    return instance;
}

export const getListGroup = (params) => {
    return getInstance().post('/api/group/fetch_list_group_config', params).then(res => res.data)
}

export const saveDataGroup = (data) => {
    return getInstance().post('/api/group/save_group', data).then(res => res.data)
}

export const getListUpdateConfig = (params) => {
    return getInstance().get('/api/group/search_config_in_group', {params}).then(res => res.data)
}

export const updateConfigToGroup = (data) => {
    return getInstance().post('/api/group/save_multiple_config_to_group', data).then(res => res.data)
}

export const deleteConfigGroup = (params) => {
    return getInstance().get('/api/group/delete', {params}).then(res => res.data)
}


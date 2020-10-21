import IMSWidgetMedia from '../plugins/ims-widget-media'
import safeInvoke from "./safeInvoke";
import {getManagerToken} from "../site-info/api-info";


export const initUploadFileData = (params) => {
    return new Promise((resolve, reject) => {
        IMSWidgetMedia.init({
            name: 'uploadFiledata',
            getTokenFunction: getManagerToken,
            options: Object.assign({allowSave: true}, params, {
                callback: (images) => {
                    safeInvoke(params.callback, images);
                    resolve(images);
                }
            })
        }).catch(error => {
            reject(error)
        });
    })
}

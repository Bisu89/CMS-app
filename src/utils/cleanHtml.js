import objectToFormData from 'src/utils/objectToFormData'
import formDataToObject from 'src/utils/formDataToObject'
import configService from 'src/services/config'


const cleanHtml = html => {
    if (!html) return html;
    return cleanEditorContent(html)
}


const blackList = {
    "body": [cleanHtml],
    "content": [cleanHtml],
}

export const cleanEditorContent = html => {
    const allowEmbedDomains = typeof editorConfigs.allowEmbedDomains != "undefined" && Array.isArray(editorConfigs.allowEmbedDomains) ? editorConfigs.allowEmbedDomains : ['vcplayer.mediacdn.vn','player.sohatv.vn','youtube.com','youtu.be', /*'vimeo.com','www.vimeo.com','player.vimeo.com',*/'facebook.com','instagram.com','twitter.com'];

    return sanitizeHtml(html, {
        allowedTags: false,
        allowedAttributes: false,
        nonTextTags: ['style', 'script', 'textarea', 'noscript', 'form', 'input', 'button', 'body', 'head', 'meta', 'embed'],
        allowedIframeHostnames: allowEmbedDomains,
        parser: {
            decodeEntities: true
        },
    });
}



export const cleanInput = function cleanInput(input, name, path) {
    if (!configService.getState().xssProtect) {
        return input;
    }

    if (!input) return input;

    switch (typeof (input)) {
        case "string": {
            if (name) {
                if (typeof input == "string" && blackList[name]) {
                    let result = input;
                    blackList[name].forEach(f => {
                        result = f(result)
                    });
                    return result;
                }

                //if (whiteList.indexOf(name) !== -1) return input;
            }

            return getSafeText(input);
        }
        case "object": {
            if (input instanceof FormData) {
                return objectToFormData(cleanInput(formDataToObject(input)));
            }

            if (Array.isArray(input)) {
                return input.map(item => cleanInput(item))
            }

            let keys = Object.keys(input);
            if (keys && keys.length) {
                let result = {};
                keys.forEach(key => {
                    result[key] = cleanInput(input[key], key, path ? `${path}[${key}]` : key)
                })
                return result;
            }
            break;
        }

        case "function":
            return null;
    }

    return input
}

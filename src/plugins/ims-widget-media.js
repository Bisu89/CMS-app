import {getManagerToken} from "../site-info/api-info";

let callbacks = [];

const onChange = (cb) => {
    console.log(cb)
    callbacks.push(cb)
    return () => callbacks = callbacks.filter(f => f !== cb);
}

const emitChange = () => {
    callbacks.forEach(f => f(window.IMSWidgetMedia))
}


const config = [
    "//mic17.cnnd.vn/statics/media-plugin/dist/ims-plugin-media.js"
]

export const getInstance = () => {
    return new Promise((resolve, reject) => {
        if (window.IMSWidgetMedia) {
            return resolve(window.IMSWidgetMedia);
        }

        loadJs(config, (error) => {
            if (error) {
                return reject(error)
            }

            if (typeof window.IMSWidgetMedia == 'undefined' || !window.IMSWidgetMedia || typeof window.IMSWidgetMedia.init != 'function') {
                const unlisten = onChange((instance) => {
                    resolve(instance)
                    unlisten();
                })
                return;
            }

            resolve(window.IMSWidgetMedia)
            emitChange();
        })
    })
}


export const init = (methods) => {
    let args = Object.assign({}, methods)
    if (!args.username && !args.scope) {
        Object.assign(args, {username: "admin", scope: "127233267387600896"});
    }
    return getInstance()
        .then(manager => {
            manager.init({
                locale: 'vi',
                plugins: {
                    name: 'media',
                    options: {
                        getTokenFunction: getManagerToken,
                    },
                    methods
                }
            });
        })
}

export default {
    init
}

const loadJs = (url, callback) => {
    console.log(url, 'url')
    if (typeof url == 'undefined' || url === '')
        return;

    if (typeof (callback) != "function")
        callback = function () {
        };

    let jsList = [];
    if (url instanceof Array) {
        jsList = url;
    } else {
        jsList.push(url);
    }
    if (typeof (callback) == "undefined")
        callback = function () {
        };

    const linkCount = jsList.length;
    let current = 0;
    const head = document.getElementsByTagName('head')[0];

    jsList.forEach(function (url, i) {
        if (url.indexOf('?') !== -1) {
            url = url.substr(0, url.indexOf('?'));
        }

        //huu added for prevent load duplicate script
        const arrScripts = document.querySelectorAll('script[src^="' + url + '"]');
        if (arrScripts == null || arrScripts.length === 0) {
            try {
                const scriptEl = document.createElement('script');
                scriptEl.type = 'text/javascript';
                //scriptEl.async = true;
                scriptEl.src = `//mic17.cnnd.vn/statics/media-plugin/dist/ims-plugin-media.js?imsd-version=1602818729744-34`;

                scriptEl.onload = scriptEl.onreadystatechange = function () {
                    current++;
                    if (current === linkCount)
                        callback();
                };
                scriptEl.addEventListener('error', function () {

                    current++;
                    if (current === linkCount)
                        callback();
                });
                head.appendChild(scriptEl);
            } catch (ex) {
                current++;
                if (current === linkCount)
                    callback();
            }
        } else {
            current++;
            if (current === linkCount)
                callback();
        }
    });
}

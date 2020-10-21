export const getItem = (key) => {
    if (window.localStorage) {
        return window.localStorage.getItem(key)
    }
}

export const setItem = (key, value) => {
    if (window.localStorage) {
        if (typeof value == 'object') {
            return window.localStorage.setItem(key, JSON.stringify(value))
        }
        return window.localStorage.setItem(key, value)
    }
}


export const getJson = (key) => {
    let data = getItem(key)
    if (data) {
        try {
            return JSON.parse(data)
        } catch (e) {
        }
    }
    return data
}


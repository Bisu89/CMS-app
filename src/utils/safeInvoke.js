const safeInvoke = function safeInvoke(func, ...args) {
    if (typeof func == 'function') {
        return func(...args);
    }
}

export default safeInvoke;
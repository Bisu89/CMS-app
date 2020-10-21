const formatDatePrefix = n => {
    if (isNaN(n)) return '00';
    var result = (n + '');
    if (result.length < 2) return '0' + n;
    return result;
}

export default formatDatePrefix;
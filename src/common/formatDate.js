import formatDatePrefix from './formatDatePrefix.js'
import toGMT7 from './toGMT7.js'

export const FORMATS = {
    "dd Tháng m, yyyy": "dd Tháng m, yyyy"
}

const formatDate = (value, format = 'dd/MM/yyyy HH:mm') => {
    if (!value) return "";
    try {
        let objDate = toGMT7(value);
        let date = formatDatePrefix(objDate.getDate());
        let month = formatDatePrefix(objDate.getMonth() + 1);
        let year = objDate.getFullYear();
        let hours = formatDatePrefix(objDate.getHours());
        let minutes = formatDatePrefix(objDate.getMinutes());
        let seconds = formatDatePrefix(objDate.getSeconds());
        switch (format) {
            case 'dd/MM':
                return `${date}/${month}`;
            case 'MM/dd':
                return `${month}/${date}`;
            case 'MM/dd/YYYY':
                return `${month}/${date}/${year}`;
            case 'HH:mm':
                return `${hours}:${minutes}`;
            case 'dd-MM-yyyy':
                return `${date}-${month}-${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${date}`
            case 'dd/MM/yyyy':
                return `${date}/${month}/${year}`;
            case 'HH:mm dd/MM/yyyy':
                return ` ${hours}:${minutes} ${date}/${month}/${year}`;
            case 'yyyy-mm-ddTHH:mm:ssZ':
                return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
            case 'dd-MM-yyyy HH:mm:ss':
                return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            case FORMATS["dd Tháng m, yyyy"]:
                return `${date} Tháng ${month}, ${year}`;
            case 'dd/MM/yyyy HH:mm':
            default:
                return `${date}/${month}/${year} ${hours}:${minutes}`;
        }
    } catch (e) {
        console.error(e);
        return "";
    }
}

export default formatDate;

const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

export const randomId = (length = 10) => {
    let text = "";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export default randomId;
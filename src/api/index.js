import InvalidCredentialsErrors from '../errors/InvalidCredentials'

const getHeaders = () => {
    let token = "";
    try {
        token = JSON.parse(localStorage.getItem('Authorization'));
    } catch (e) {
    }
    return {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
    };
}
const doRequest = async (url, headers = {}, body = {}, method = "GET") => {

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                ...getHeaders(),
                ...headers
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (e) {

        if (e.message === '401') {
            throw new InvalidCredentialsErrors();
        }
        throw new Error('Something went wrong');
    }

}

export const makeGet = async (url, headers = {}) => {
    return doRequest(url, headers)
}


export const makePost = async (url, headers = {}, body = {}) => {
    return doRequest(url, headers, body, 'POST')
}
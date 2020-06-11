import config from 'config';
import { authHeader } from '../_helpers';
import { timer } from 'rxjs';

export const adminService = {
    setParser,
    getUrlStatus,
};

function setParser(parser) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            "parser":  parser 
        })
    };
    return fetch(`${config.adminUrl}/parser`, requestOptions).then(resp => {
        console.log('response after setting parser', resp)
        return Promise.resolve(resp)
    }).catch(error => {
        console.error('error while setting parser')
        return Promise.reject()
    }).finally(r => {
        console.log('done with set parser')
    });
}

function getUrlStatus(parser) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.adminUrl}/urls/getUrlStatus`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
import config from 'config';
import { authHeader } from '../_helpers';
import { timer } from 'rxjs';

export const adminService = {
    setParser,
};

function setParser(parser) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            parser
        })
    };
    return fetch(`${config.adminUrl}/rules/setParser`, requestOptions).then(resp => {
        console.log('response after setting parser', resp)
        return Promise.resolve(resp)
    }).catch(error => {
        console.error('error while setting parser')
        return Promise.reject()
    }).finally(r => {
        console.log('done with set parser')
    });
}
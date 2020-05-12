import config from 'config';
import { authHeader } from '../_helpers';
import { timer } from 'rxjs';

export const adminService = {
    getAllRules,
    getRule
};

function getRule(ruleId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.adminUrl}/rules/getRule?ruleId=` + ruleId, requestOptions).then(handleResponse);
}

function getAllRules() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.adminUrl}/rules/getRules`, requestOptions).then(handleResponse);
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
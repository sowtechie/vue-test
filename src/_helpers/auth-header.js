import headersJson from './../assets/headers.json'
import { securityService } from "../_services"

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        return { 
            'Authorization': 'Basic ' + user.authdata, 
            "Verizon-Headers-Json": securityService.getSecuredHeaders(headersJson) };
    } else {
        return {};
    }
}


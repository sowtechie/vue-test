import headersStatus from '../assets/headersStatus.json'
import headersJson from '../assets/headers.json'
import { securityService } from "../_services"

export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authdata) {
        return { 
            'Authorization': 'Basic ' + user.authdata, 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
//            "Verizon-Headers-Json": securityService.getSecuredHeaders(headersJson)
          //  "Verizon-Headers-Json": securityService.getSecuredHeaders(headersStatus)
           };
    } else {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8082'
//            "Verizon-Headers-Json": securityService.getSecuredHeaders(headersJson)
            //"Verizon-Headers-Json": securityService.getSecuredHeaders(headersStatus) 
        };
    }
}


var mySecureTags = {
    secureTags: ['Server', "Etag"]
}

export const securityService = {
    getSecuredHeaders
};

 function getSecuredHeaders(headersInput) {
    const securedHeaders = {};
     mySecureTags.secureTags.forEach(tag => {
         const inputTagValue = headersInput[tag];
        console.log(inputTagValue);
        if (inputTagValue) {
            securedHeaders[tag] = inputTagValue;
        }
    });
   return JSON.stringify(headersInput);
}
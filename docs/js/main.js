function loadSOAPServices() {
    const serviceDetails = document.getElementById('service-details');
    serviceDetails.innerHTML = '<h2>SOAP Web Services</h2>';
    loadWSDL('wsdl/example.wsdl');
}

function loadRESTServices() {
    const serviceDetails = document.getElementById('service-details');
    serviceDetails.innerHTML = '<h2>REST Web Services</h2>';
    loadSwagger('openapi/swagger.json');
}

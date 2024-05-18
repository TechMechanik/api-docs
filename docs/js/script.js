// script.js
function loadWsdl(wsdlFile) {
    fetch(wsdlFile)
        .then(response => response.text())
        .then(data => parseWsdl(data))
        .catch(error => console.error('Error loading WSDL:', error));
}

function parseWsdl(wsdl) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(wsdl, "text/xml");
    
    const title = xmlDoc.getElementsByTagName("wsdl:service")[0].getAttribute("name");
    const description = "Description of " + title;  // This is a placeholder, as WSDLs do not usually contain descriptions.
    const operations = xmlDoc.getElementsByTagName("wsdl:operation");

    document.getElementById("title").textContent = title;
    document.getElementById("description").textContent = description;

    const operationsDiv = document.getElementById("operations");
    operationsDiv.innerHTML = "";
    
    for (let i = 0; i < operations.length; i++) {
        const operation = operations[i];
        const operationName = operation.getAttribute("name");
        const sampleRequest = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><" + operationName + " xmlns=\"http://example.com/\" /></soap:Body></soap:Envelope>";
        const sampleResponse = "<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"><soap:Body><" + operationName + "Response xmlns=\"http://example.com/\" /></soap:Body></soap:Envelope>";
        
        const operationDiv = document.createElement("div");
        operationDiv.innerHTML = `
            <h3>${operationName}</h3>
            <p>Sample Request:</p>
            <pre>${sampleRequest}</pre>
            <p>Sample Response:</p>
            <pre>${sampleResponse}</pre>
        `;
        operationsDiv.appendChild(operationDiv);
    }
}

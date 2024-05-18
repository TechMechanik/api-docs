function loadWSDL(wsdlPath) {
    fetch(wsdlPath)
        .then(response => response.text())
        .then(wsdlText => parseWSDL(wsdlText));
}

function parseWSDL(wsdlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(wsdlText, "text/xml");
    const services = xmlDoc.getElementsByTagName("service");

    let content = '';
    for (let service of services) {
        const serviceName = service.getAttribute("name");
        const ports = service.getElementsByTagName("port");

        content += `<h3>${serviceName}</h3>`;
        for (let port of ports) {
            const portName = port.getAttribute("name");
            const binding = port.getAttribute("binding").split(':')[1];
            const address = port.getElementsByTagName("address")[0].getAttribute("location");

            content += `<h4>Port: ${portName}</h4>`;
            content += `<p>Binding: ${binding}</p>`;
            content += `<p>Address: ${address}</p>`;

            const operations = xmlDoc.getElementsByTagName("binding");
            for (let operation of operations) {
                const operationName = operation.getAttribute("name");
                content += `<h5>Operation: ${operationName}</h5>`;
                // Add more details about each operation if needed
            }
        }
    }
    document.getElementById('service-details').innerHTML += content;
}

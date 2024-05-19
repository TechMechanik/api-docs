document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and parse the WSDL file
    function fetchAndParseWSDL(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(wsdlText => {
                const parser = new DOMParser();
                const wsdlDoc = parser.parseFromString(wsdlText, "text/xml");
                callback(wsdlDoc);
            })
            .catch(error => console.error('Error fetching WSDL:', error));
    }

    // Render WSDL information
    function renderWSDL(wsdlDoc) {
        const soapUI = document.getElementById('soap-ui');
        soapUI.innerHTML = '<h2>WSDL Documentation</h2>';
        const services = wsdlDoc.getElementsByTagName('wsdl:service');
        for (let i = 0; i < services.length; i++) {
            const service = services[i];
            const serviceName = service.getAttribute('name');
            const serviceElem = document.createElement('div');
            serviceElem.innerHTML = `<h3>${serviceName}</h3>`;
            const ports = service.getElementsByTagName('wsdl:port');
            for (let j = 0; j < ports.length; j++) {
                const port = ports[j];
                const portName = port.getAttribute('name');
                const portElem = document.createElement('div');
                portElem.innerHTML = `<h4>${portName}</h4>`;
                serviceElem.appendChild(portElem);
            }
            soapUI.appendChild(serviceElem);
        }
    }

    // Load WSDL menu items
    fetch('wsdl/config.json')
        .then(response => response.json())
        .then(config => {
            const wsdlMenu = document.getElementById('soap-menu');
            config.wsdls.forEach(wsdl => {
                const wsdlLink = document.createElement('a');
                wsdlLink.textContent = wsdl.name;
                wsdlLink.href = `#/${wsdl.name}`;
                wsdlLink.classList.add('collapsible');
                wsdlLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    fetchAndParseWSDL(wsdl.url, renderWSDL);
                });
                wsdlMenu.appendChild(wsdlLink);
            });
        })
        .catch(error => console.error('Error fetching WSDL config:', error));

    // Load Swagger UI for REST API
    fetch('swagger/config.json')
        .then(response => response.json())
        .then(config => {
            const ui = SwaggerUIBundle({
                ...config,
                dom_id: '#swagger-ui',
                onComplete: () => {
                    const swaggerData = ui.getSystem().specSelectors.specJson().toJS();
                    const sidebarMenu = document.getElementById('sidebar-menu');
                    const tags = swaggerData.tags;

                    tags.forEach(tag => {
                        const tagItem = document.createElement('div');
                        const tagLink = document.createElement('a');
                        tagLink.textContent = tag.name;
                        tagLink.classList.add('collapsible');
                        tagLink.href = `#/${tag.name}`;
                        tagItem.appendChild(tagLink);

                        const operationsList = document.createElement('div');
                        operationsList.classList.add('content-hidden');

                        const paths = swaggerData.paths;
                        for (const path in paths) {
                            for (const method in paths[path]) {
                                if (paths[path][method].tags.includes(tag.name)) {
                                    const operationId = paths[path][method].operationId;
                                    const basePath = `#/${tag.name}/${operationId}`;
                                    const operationLink = document.createElement('a');
                                    operationLink.href = basePath;
                                    operationLink.textContent = `${method.toUpperCase()} ${path}`;
                                    operationLink.classList.add('operation-link');
                                    operationsList.appendChild(operationLink);
                                }
                            }
                        }

                        tagItem.appendChild(operationsList);
                        sidebarMenu.appendChild(tagItem);

                        tagLink.addEventListener('click', function(e) {
                            e.preventDefault();

                            document.querySelectorAll('.collapsible').forEach(item => {
                                if (item !== tagLink) {
                                    item.classList.remove('open');
                                    item.nextElementSibling.classList.add('content-hidden');
                                }
                            });

                            operationsList.classList.toggle('content-hidden');
                            tagLink.classList.toggle('open');

                            const tagElement = document.querySelector(`a[href="#/${tag.name}"]`);
                            if (tagElement) {
                                tagElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        });
                    });

                    document.querySelectorAll('#sidebar-menu a.operation-link').forEach(anchor => {
                        anchor.addEventListener('click', function(e) {
                            e.preventDefault();

                            const href = this.getAttribute('href');
                            window.location.hash = href;

                            setTimeout(() => {
                                const operationElement = document.querySelector(`a[href="${href}"]`);
                                if (operationElement) {
                                    operationElement.scrollIntoView({ behavior: 'smooth' });
                                    const parentElement = operationElement.closest('.opblock');
                                    if (parentElement) {
                                        const summaryElement = parentElement.querySelector('.opblock-summary');
                                        if (summaryElement && !summaryElement.classList.contains('open')) {
                                            summaryElement.click();
                                        }
                                    }
                                }
                            }, 200);
                        });
                    });

                    const hash = window.location.hash;
                    if (hash) {
                        setTimeout(() => {
                            const operationElement = document.querySelector(`a[href="${hash}"]`);
                            if (operationElement) {
                                operationElement.scrollIntoView({ behavior: 'smooth' });
                                const parentElement = operationElement.closest('.opblock');
                                if (parentElement) {
                                    const summaryElement = parentElement.querySelector('.opblock-summary');
                                    if (summaryElement && !summaryElement.classList.contains('open')) {
                                        summaryElement.click();
                                    }
                                }
                            }
                        }, 200);
                    }
                },
                plugins: [
                    () => {
                        return {
                            components: {
                                Topbar: () => null
                            }
                        }
                    }
                ]
            });
        });
});

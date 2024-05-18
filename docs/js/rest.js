function loadSwagger(swaggerPath) {
    fetch(swaggerPath)
        .then(response => response.json())
        .then(swaggerData => parseSwagger(swaggerData));
}

function parseSwagger(swaggerData) {
    let content = `<h3>${swaggerData.info.title}</h3>`;
    content += `<p>${swaggerData.info.description}</p>`;

    for (let path in swaggerData.paths) {
        content += `<h4>Endpoint: ${path}</h4>`;
        const methods = swaggerData.paths[path];
        for (let method in methods) {
            const details = methods[method];
            content += `<h5>Method: ${method.toUpperCase()}</h5>`;
            content += `<p>${details.summary}</p>`;
            content += `<pre><code>${JSON.stringify(details.parameters, null, 2)}</code></pre>`;
            // Add more details about each endpoint if needed
        }
    }
    document.getElementById('service-details').innerHTML += content;
}

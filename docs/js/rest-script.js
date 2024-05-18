document.addEventListener("DOMContentLoaded", function() {
    const ui = SwaggerUIBundle({
        url: "https://petstore.swagger.io/v2/swagger.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        docExpansion: 'none',
        operationsSorter: 'alpha',
        onComplete: () => {
            const swaggerData = ui.getSystem().specSelectors.specJson().toJS();
            const sidebarMenu = document.getElementById('sidebar-menu');
            const tags = swaggerData.tags;

            tags.forEach(tag => {
                const tagItem = document.createElement('div');
                const tagLink = document.createElement('div');
                tagLink.textContent = tag.name;
                tagLink.classList.add('collapsible');
                tagItem.appendChild(tagLink);

                const operationsList = document.createElement('div');
                operationsList.classList.add('content-hidden');

                const paths = swaggerData.paths;
                for (const path in paths) {
                    for (const method in paths[path]) {
                        if (paths[path][method].tags.includes(tag.name)) {
                            const operationId = `${method}-${path}`;
                            const operationLink = document.createElement('a');
                            operationLink.href = `#${method}${path}`;
                            operationLink.textContent = `${method.toUpperCase()} ${path}`;
                            operationsList.appendChild(operationLink);
                        }
                    }
                }

                tagItem.appendChild(operationsList);
                sidebarMenu.appendChild(tagItem);

                tagLink.addEventListener('click', function() {
                    operationsList.classList.toggle('content-hidden');
                });
            });

            document.querySelectorAll('#sidebar-menu a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const href = this.getAttribute('href').substring(1);
                    const methodPathParts = href.split('/');
                    const method = methodPathParts.shift();
                    const path = '/' + methodPathParts.join('/');
                    const operationElement = document.querySelector(`a[href="#${method}${path}"]`);

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
                });
            });

            const hash = window.location.hash.substring(1);
            if (hash) {
                const methodPathParts = hash.split('/');
                const method = methodPathParts.shift();
                const path = '/' + methodPathParts.join('/');
                const operationElement = document.querySelector(`a[href="#${method}${path}"]`);

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

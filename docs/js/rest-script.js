document.addEventListener("DOMContentLoaded", function() {
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

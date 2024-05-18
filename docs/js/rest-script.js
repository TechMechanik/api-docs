window.onload = function() {
    const ui = SwaggerUIBundle({
        url: "assets/swagger.json", // Path to your Swagger file
        dom_id: '#swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout", // Use BaseLayout to hide the top bar
        deepLinking: true,
        docExpansion: "none", // Collapse all sections by default
        operationsSorter: "alpha", // Sort operations alphabetically
        showExtensions: true,
        showCommonExtensions: true
    });
    window.ui = ui;
};

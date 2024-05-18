window.onload = function() {
    const ui = SwaggerUIBundle({
        url: "swagger/swagger.json", // Path to your Swagger file
        dom_id: '#swagger-ui',
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
    });
    window.ui = ui;
};

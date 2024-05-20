
# api-doc Documentation

Welcome to the api-doc Documentation repository. This repository contains files and configurations for documenting REST and SOAP APIs using Swagger UI and WSDL parsing.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Overview

This repository provides an easy-to-navigate web interface for viewing API documentation. It supports both RESTful APIs (documented using Swagger/OpenAPI) and SOAP APIs (documented using WSDL).

## File Structure

```
api-docs/
├── assets/
│   ├── openapi/
│   │   └── v3.0/
│   │       └── petstore.json
│   └── wsdl/
│       ├── globalweather.wsdl
│       └── anotherservice.wsdl
├── css/
│   └── style.css
├── js/
│   └── script.js
├── swagger/
│   ├── config.json
│   ├── swagger-ui-bundle.js
│   ├── swagger-ui-standalone-preset.js
│   └── swagger-ui.css
├── wsdl/
│   └── config.json
└── index.html
```

### assets/

- **openapi/v3.0/petstore.json**: The OpenAPI (Swagger) specification file for the Petstore example API.
- **wsdl/globalweather.wsdl**: WSDL file for the GlobalWeather SOAP service.
- **wsdl/anotherservice.wsdl**: WSDL file for another SOAP service example.

### css/

- **rest-custom.css**: Custom CSS styles for the API documentation pages.
- **swagger-ui.css**: Default CSS styles provided by Swagger UI.

### js/

- **rest-script.js**: JavaScript file to handle the rendering of Swagger UI and WSDL parsing.

### swagger/

- **config.json**: Configuration file for Swagger UI, specifying settings like the URL of the OpenAPI specification.
- **swagger-ui-bundle.js**: Bundled JavaScript file provided by Swagger UI.
- **swagger-ui-standalone-preset.js**: Standalone preset for Swagger UI.
- **swagger-ui.css**: Default CSS styles provided by Swagger UI.

### wsdl/

- **config.json**: Configuration file listing the WSDL files to be displayed in the documentation.

### rest.dsp

- **rest.dsp**: The main DSP (Dynamic Server Pages) file that structures the web interface for viewing the API documentation.

## Dependencies

To run this project, you need:

- A web server capable of serving DSP pages (e.g., Apache Tomcat).
- Internet access to fetch external resources (e.g., Swagger UI assets).

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/TechMechanik/api-docs.git
   cd api-docs
   ```

2. **Configure Your Server**

   Ensure your web server is configured to serve DSP files and has access to the necessary directories.

3. **Place Your WSDL Files**

   Add your WSDL files to the `assets/wsdl/` directory and update `wsdl/config.json` accordingly.

4. **Update Swagger Config**

   If needed, update the `swagger/config.json` file to point to your OpenAPI specification file.

## Usage

1. **Start Your Server**

   Start your web server and navigate to the URL where the `rest.dsp` file is served. For example:

   ```
   http://localhost:8080/api-docs/rest.dsp
   ```

2. **Navigate the Documentation**

   - **SOAP Section**: Click on the SOAP menu items to view the parsed WSDL documentation.
   - **REST Section**: Click on the REST menu items to view the Swagger UI documentation.

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

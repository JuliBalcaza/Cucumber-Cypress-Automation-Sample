const environment = 'staging'; // or 'production', 'UAT'

const config = {
  staging: {
    BASE_URL: 'https://example.staging.url',
    LOGIN_URL: 'https://auth.staging.url',
    RECOVER_PASS_URL: 'https://recover.staging.url'
  },
  production: {
    BASE_URL: '',
    LOGIN_URL: '',
    RECOVER_PASS_URL: ''
  },
  UAT: {
    // UAT-specific configurations
  }
};

// Basic paths for documentation
const DOCS_PATH = `${config[environment].BASE_URL}/docs`;
const FACTIVA_PATH = `${DOCS_PATH}/apis`;

const urls = {
  home: `${config[environment].BASE_URL}/home`,
  loginUrl: config[environment].LOGIN_URL,
  recoverPasswordUrl: config[environment].RECOVER_PASS_URL,
  documentation: `${DOCS_PATH}/getting_started`
};

// API collections for different modules
const APIcollectionsObject = {
  newswires_apis: [
    `${FACTIVA_PATH}/api_1`,
    `${FACTIVA_PATH}/api_2`
  ],
  factiva_apis: [
    `${FACTIVA_PATH}/api_1`,
    `${FACTIVA_PATH}/api_2`
  ]
};

module.exports = {
  urls,
  APIcollectionsObject
};

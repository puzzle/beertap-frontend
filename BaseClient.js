export default class BaseClient {

    retrieveConfiguration() {
        return fetch('/config/config.json')
            .then(res => res.json());
    }

    retrieveBaseUrl() {
        return this.retrieveConfiguration()
            .then(config => {
                this.baseUrl = `http://${config.backend.host}:${config.backend.port}/api/invoice`;
            })
    }
}
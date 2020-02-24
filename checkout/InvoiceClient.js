import BaseClient from "../BaseClient.js";

export default class InvoiceClient {
    constructor() {
        this.config = new BaseClient();
    }

    async generateInvoice(amount, memo) {
        await this.config.retrieveBaseUrl();
        return fetch(this.config.baseUrl + `?amount=${amount}&memo=${memo}`)
            .then(result => result.json());
    }
}
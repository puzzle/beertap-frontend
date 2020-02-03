import BaseClient from "../BaseClient.js";

export const EVENT_KEYS = {
    PAID_INVOICE: 'paid-invoice'
}


export default class InvoiceClient {

    constructor() {
        this.config = new BaseClient();
    }

    async startListener() {
        await this.config.retrieveBaseUrl();
        let eventSource = new EventSource(this.config.baseUrl + "/subscribe", {
            withCredentials: true
        })
        eventSource.addEventListener("invoice", event => {
            console.log("sending invoice as event");
            console.dir(event.data)
            let invoice = JSON.parse(event.data);
            send(EVENT_KEYS.PAID_INVOICE, invoice);
        })
        eventSource.onerror = e => {
            console.error(e);
            setTimeout(() => this.startListener(), 5000)
        };
    }
}
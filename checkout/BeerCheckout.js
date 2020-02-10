import BaseElement from "../BaseElement.js";
import {html} from '../libs/lit-html.js'
import CheckoutClient from "./InvoiceClient.js";
import {EVENT_KEYS as InvoiceEvents} from '../invoices/InvoiceClient.js'

export default class BeerCheckout extends BaseElement {

    connectedCallback() {
        this.configureListeners();
        this.price = this.getAttribute("beer-price") || "1";
        this.name = this.getAttribute("beer-name") || "beer";
        this.tap = this.getAttribute("beer-tap");
        this.instance = this.getAttribute("instance");
        this.generateInvoice();
    }

    configureListeners() {
        addEventListener(InvoiceEvents.PAID_INVOICE, e => {
            let incoming = e.detail;
            if (this.invoice && incoming.id && this.invoice.id === incoming.id) {
                this.invoice = Object.assign({}, this.invoice, incoming);
                this.render();
                if (incoming.settled === true) {
                    setTimeout(() => this.generateInvoice(), 5000)
                }
            }
        })
    }
    // please fix me!!! Indicates if there should be a style.css
    getImportMeta() {
        return import.meta;
    }

    generateInvoice() {
        if (this.invoiceTimer) {
            clearTimeout(this.invoiceTimer);
        }
        let invoiceMemo = `${this.instance} ${this.tap} ${this.name}`;
        new CheckoutClient().generateInvoice(this.price, invoiceMemo)
            .then(invoice => {
                this.invoice = invoice
                this.render();
                this.invoiceTimer = setTimeout(() => this.generateInvoice(), 300000) // generete new every 5 min
            })
    }

    getTemplate() {
        let content;
        if (this.invoice && this.invoice.paymentRequest) {
            content = html`
            <div class="beer-info">
                <div class="beer-flip-container">
                    <div class="beer-flip-card ${this.invoice.settled?"settled":""}">
                        <div class="beer-flip-card-inner">
                            <div class="beer-flip-card-front">
                                <beer-qr data="${this.invoice.paymentRequest.toUpperCase()}"></beer-qr>
                            </div>
                            <div class="beer-flip-card-back">
                                <img src="/images/beer.jpg"></img>
                                <div>Enjoy your beer<br>Lightning pioneer!</div>
                            </div>
                        </div>
                        <div class="beer-flip-card-lightning-0"></div>
                        <div class="beer-flip-card-lightning-1"></div>
                    </div>
                </div>
                <div class="beer-price">${this.price}</div>
                <div class="beer-name">${this.name}</div>
                ${this.invoice.paymentRequest.toUpperCase()}
                ${this.invoice.id}
            </div>`;
        } else {
            content = html`
            <div>Loading</div>
        `;
        }
        return html`<div class="beer-checkout-container">${content}</div>`;
    }
}

customElements.define('beer-checkout', BeerCheckout);

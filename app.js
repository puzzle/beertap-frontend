import './checkout/BeerCheckout.js'
import './beerTap/BeerTap.js'
import './libs/qr-code.js'
import InvoiceClient from './invoices/InvoiceClient.js'

if (!window.send) {
    window.send = (name, data) => {
        document.dispatchEvent(new CustomEvent(name, {
            detail: data,
            bubbles: true
        }));
    }
}

(function() {
    let invoiceClient = new InvoiceClient();
    invoiceClient.startListener();
 })();
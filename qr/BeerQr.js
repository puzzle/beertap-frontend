export default class BeerQr extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data') {
            this.render(newValue);
        } else {
            console.log(`Unknown attribute`);
        }
    }
    static get observedAttributes() {
        return ['data'];
    }

    connectedCallback() {
        let data = this.getAttribute("data");
        this.render(data)
    }

    render(data) {
        if (data) {
            var typeNumber = 0;
            var errorCorrectionLevel = 'L';
            var qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(data);
            qr.make();
            this.root.innerHTML = qr.createSvgTag({
                cellSize: 100,
                margin: 0,
                scalable: true
            });
        }
    }
}


customElements.define('beer-qr', BeerQr);

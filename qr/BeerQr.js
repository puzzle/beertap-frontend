
export default class BeerQr extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }


    
    connectedCallback() {
        let data = this.getAttribute("data");
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

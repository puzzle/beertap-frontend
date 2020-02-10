import BaseElement from "../BaseElement.js";
import {html} from '../libs/lit-html.js'
import BaseClient from "../BaseClient.js";

export default class BeerTap extends BaseElement {

    connectedCallback() {
        this.fetchBeers();
    }

    // please fix me!!! Indicates if there should be a style.css
    getImportMeta() {
        return import.meta;
    }

    fetchBeers() {
        new BaseClient().retrieveConfiguration()
        .then(config => {
            this.beers = config.beers;
            this.instance = config.instance.name;
            this.render();
        });
    }

    getTemplate() {
        const beerList = (beer,i) => html`<beer-checkout id=${i} instance="${this.instance}" beer-tap="${beer.tap}" beer-price=${beer.price} beer-name=${beer.name}></beer-checkout>`;
        return html`
            <div class="beer-tap-container-outer">
                <div class="beer-tap-container-inner">
                    ${this.beers.map(beerList)}
                </div>
            </div>
        `;
    }
}

customElements.define('beer-tap', BeerTap);

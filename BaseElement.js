import {html, render} from './libs/lit-html.js'

export default class BaseElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    getStyle() {
        if (!this.getImportMeta) {
            return false;
        }
        const relativePath = this.getImportMeta().url.substring(window.location.origin.length);
        const end = relativePath.lastIndexOf('/');
        const path = relativePath.substring(0, end);
        return `./${path}/style.css`;
    }

    render() {
        if (this.getStyle()) {
            fetch(this.getStyle())
                .then(css => css.text())
                .then(css => {
                    render(html`
                        <style>
                            ${css}
                        </style>
                        ${this.getTemplate()}
                    `, this.root);
                })
        } else {
            render(this.getTemplate(), this.root);
        }
    }
}

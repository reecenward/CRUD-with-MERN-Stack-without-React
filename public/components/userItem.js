//const e = require("express");

const template = document.createElement("template");
template.innerHTML = `
    <style>
    h3 {
        color: coral;
    }
    </style>
    <div class="user-item">
        <img />
        <div>
            <h3></h3>
            <div class="info">
                <p>EMAIL</p>
                <p>PHONE</p>
            </div>
            <button id="toggle-info">Hide Info</button>
        </div>
    </div>
`

class UserItem extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

        if (this.showInfo) {
            info.style.display = 'block';
        } else {

        }
    }

    connectedCallBack() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallBack() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

window.customElements.define("user-item", UserItem);
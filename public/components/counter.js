function updateItem(data) {

    class MyCounter extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
        }

        get count() {
            return this.getAttribute("count");
        }

        set count(val) {
            this.setAttribute("count", val);
        }

        static get observedAttributes() {
            return ["count"];
        }

        attributeChangedCallback(prop, oldVal, newVal) {
            if (prop === "count") {
                this.render();
            }
        }

        inc() {
            this.count++;
        }

        connectedCallback() {
            this.render();
        }

        render() {
            this.shadow.innerHTML = `
        <h1>${data}</h1>
        `;
        }
    }

    customElements.define("my-counter", MyCounter);

}
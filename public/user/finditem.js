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
        this.shadow.innerHTML = `<h1>${this.count}</h1>`;
    }
}

customElements.define("my-counter", MyCounter);

function updateItem(data) {
    document.querySelector('#counter').count = data;
}

const form = document.querySelector('#myForm');

form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from submitting

    var input = document.getElementById('item').value;
    document.getElementById('item').value = '';
    console.log(input);
    fetch(`/userRoute?item=${input}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then((items) => {
            // Update the item list on the page
            console.log("returned " + items.item);
            if (items.item == undefined) {
                updateItem("This item is not in store :(");
            } else if (items.item.slice(-1) == "s") {
                updateItem(items.item + " are in isle 5");
            } else {
                updateItem(items.item + " is in isle 10");
            }
        })
        .catch(error => {
            // Handle any errors
        });
});
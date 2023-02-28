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
        <style>
            li {
                margin-left: 25px;
            }
            #poopy {
                justify-content: space-between;
                width: 40vw;
                height: 60px;
                background-color: rgb(43, 43, 46);
                box-shadow: 0px 0px 10px #161616;
                display: flex;
                align-items: center;
                border-radius: 5px;
                margin-bottom: 10px;
            }
            ul {
                list-style-type: none;
            }
        </style>
        <div id="poopy">
            <li>${this.count}</li>
        
        </div>`;
    }
}

customElements.define("my-counter", MyCounter);

function updateItem(items) {
    // Convert the items to an array
    const itemArray = Array.isArray(items) ? items : [items];

    // Clear the current list of items on the page
    document.querySelector('#item-list').innerHTML = '';

    // Iterate through the list of items
    itemArray.forEach((item, i) => {
        // Create a new div element
        const counterDiv = document.createElement('div');
        counterDiv.id = `counter-${i}`;

        // Create a new my-counter element
        const counter = document.createElement('my-counter');

        // Set the count attribute of the element to the item data
        counter.setAttribute('count', item);

        // Append the element to the list of items on the page
        counterDiv.appendChild(counter);
        document.querySelector('#item-list').appendChild(counterDiv);
    });
}

//web socket part
//=======================================================

const path = window.location.pathname;
const parts = path.split('/');
const lastPart = parts.slice(-1)[0];

// Get a reference to the WebSocket connection
const socket = new WebSocket(`ws://localhost:4000`);

const form = document.querySelector('#myForm');
const textbox = document.querySelector('#item');

// on input
textbox.addEventListener('input', event => {
    // Send the data in the textbox to the WebSocket server
    console.log(lastPart);
    // Send the data in the textbox to the WebSocket server along with the lastPart variable
    socket.send(JSON.stringify({
        data: event.target.value,
        lastPart: lastPart
    }))
});

// on submit
form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from submitting

    var input = document.getElementById('item').value;
    document.getElementById('item').value = '';
    console.log(input);
    console.log(lastPart);
    // Send a message over the WebSocket connection
    socket.send(input, lastPart);
});

// when received response
// Set up an event listener for messages from the server
socket.onmessage = function(event) {
    const itemArray = JSON.parse(event.data);
    console.log('received: ', itemArray);

    // Update the item list on the page
    updateItem(itemArray);
}
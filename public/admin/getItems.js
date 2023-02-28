function getItems() {
    fetch('/adminRoute')
        .then(response => {
            console.log(response); // Log the response from the server
            return response.json();
        })
        .then((items) => {
            console.log("serverL " + items);
            updateItems(items);
        });
}

class MyItem extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    get item() {
        return this.getAttribute("item");
    }

    set item(val) {
        this.setAttribute("item", val);
    }

    static get observedAttributes() {
        return ["item"];
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        if (prop === "item") {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        const item = JSON.parse(this.getAttribute("item"));

        // Select the edit button
        const editButton = this.shadow.querySelector('#edit');
        // Add an event listener to the edit button
        editButton.addEventListener('click', (event) => {
            // Call the editItem function with the id and input
            editItemCallback(item);
        });

        function editItemCallback(item) {
            let input = prompt(`Enter what you want to change ${item.name} to.`);
            while (input.length === 0 || !/^[a-z0-9._%+-]{2,}$/.test(input)) {
                alert('No symbols or spaces.');
                input = prompt(`Enter what you want to change ${item.name} to.`);
            }

            editItem(item._id, input);
        }

        // Select the delete button
        const deleteButton = this.shadow.querySelector('#delete');

        // Add an event listener to the delete button
        deleteButton.addEventListener('click', (event) => {
            // Call the deleteItem function with the id
            deleteItem(item._id);
        });
    }

    render() {
        const item = JSON.parse(this.getAttribute("item"));
        this.shadow.innerHTML = `
        <style>
            button {
                margin-right: 25px;
            }
            
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

            #buttonz {
                display: flex;
            }

            ul {
                list-style-type: none;
            }

            #my-input {
                background-color: rgb(43, 43, 46);
                color: white;
                font-size: 16px;
            }

            #megaDelete {
                background-color: rgba(228, 86, 86, 0.29);
                border: none;
                border-radius: 5px;
                height: 50px;
                margin-left: 25px;
                font-weight: 800;
                font-size: medium;
                color: rgb(237, 40, 40);
            }

            #edit,
            #delete {
                font-size: 16px;
                color: white;
                background-color: #161616;
                border: none;
                border-radius: 5px;
                padding: 10px;
            }

            #edit:hover,
            #delete:hover {
                background-color: #000000;
            }
        </style>
        <div id="poopy">
            <li>${item.name}</li>
            <div id="buttonz">
                <button id="edit">edit</button>
                <button id="delete">delete</button>
            </div>
        </div>`;
    }

}

customElements.define("my-item", MyItem);

function updateItems(items) {
    // Convert the items to an array
    const itemArray = Array.isArray(items) ? items : [items];
    // Clear the current list of items on the page
    document.querySelector('#item-list').innerHTML = '';

    // Iterate through the list of items
    itemArray.forEach(item => {
        // Create a new my-item element
        const itemElement = document.createElement('my-item');

        // Set the item attribute of the element to the item data
        itemElement.setAttribute('item', JSON.stringify(item));
        // Append the element to the list of items on the page
        document.querySelector('#item-list').appendChild(itemElement);
    });
}

getItems()
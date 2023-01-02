function getItems() {
    fetch('/adminRoute')
        .then(response => response.json())
        .then((items) => {
            // Update the item list on the page
            const itemList = document.querySelector('#item-list');

            itemList.innerHTML = items
                .map(
                    (item) => `
              <div id="poopy">
                <li>${item.item}</li>
                <div id="buttonz">
                  <button id="edit">edit</button>
                  <button id="delete">delete</button>
                </div>
              </div>
            `
                )
                .join('');

            // Add event listeners to the delete buttons
            const deleteButtons = document.querySelectorAll('#delete');
            const editButtons = document.querySelectorAll('#edit');
            const lis = document.querySelectorAll('li');

            deleteButtons.forEach((button, index) =>
                button.addEventListener('click', () => {
                    const itemId = items[index]._id;
                    deleteItem(itemId);
                })
            );

            editButtons.forEach((button, index) =>
                button.addEventListener('click', () => {
                    const itemId = items[index]._id;

                    // Show a popup window with an input field
                    let input = prompt(`Enter what you want to change ${items[index].item} to.`);
                    while (input.length === 0 || !/^[a-z0-9._%+-]{2,}$/.test(input)) {
                        alert('No symbols or spaces.');
                        input = prompt(`Enter what you want to change ${items[index].item} to.`);
                    }


                    // Send the new data and the item ID to the editItem function
                    editItem(itemId, input);
                })
            );
        });
}


getItems();
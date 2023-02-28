function editItem(id, input) {
    console.log({ item: input });
    console.log(id)
    fetch(`/adminRoute/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: [input] })


        })
        .then(response => {
            console.log(response); // Log the response from the server
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data returned by the server
            location.reload(); // Reload the page to update the item list
        });
}
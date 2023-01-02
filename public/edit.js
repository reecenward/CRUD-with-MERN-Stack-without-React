function editItem(id, input) {
    console.log({ item: input });
    fetch(`/adminRoute/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: input })
        })
        .then(response => {
            console.log(response); // Log the response from the server
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data returned by the server
            //alert(data.message); // Show a message indicating that the item was updated in the database
            location.reload(); // Reload the page to update the item list
        });
}
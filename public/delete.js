function deleteItem(id) {
    fetch(`/adminRoute/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            console.log(response); // Log the response from the server
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data returned by the server
            location.reload();
        });
}
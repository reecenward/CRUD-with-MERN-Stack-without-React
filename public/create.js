const form = document.querySelector('#myForm');

form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent the form from submitting

    const formData = new FormData(form);
    const data = Object.fromEntries(formData); // Convert FormData to an object
    document.getElementById('item').value = '';
    console.log(data);
    console.log('working' + JSON.stringify(data));
    fetch('/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => {
            // Handle any errors
        });
    location.reload();
});
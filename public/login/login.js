document.getElementById('myForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;

    fetch('/loginRoute', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                window.location.assign('http://localhost:4000/');
            }
        })
        .catch(err => {
            console.error(err);
        });
});
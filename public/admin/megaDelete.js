const button = document.querySelector('#megaDelete');

button.addEventListener('click', () => {
    fetch('/adminRoute/megaDelete/yes', {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
        });
})
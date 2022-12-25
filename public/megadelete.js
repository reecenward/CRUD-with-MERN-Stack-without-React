const buton = document.querySelector('#megadelete');

buton.addEventListener('click', () => {
    fetch('/route/del/y', {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            location.reload();
        });
})
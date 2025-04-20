function validateForm(event) {
    const fileInput = document.getElementById('file');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.py|\.c)$/i;

    if (!allowedExtensions.exec(filePath)) {
        alert('Seuls les fichiers .py et .c sont autorisés.');
        event.preventDefault();
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', validateForm);
    }
});

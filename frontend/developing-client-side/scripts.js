document.getElementById('form-input').addEventListener('input', (e) => {
    localStorage.setItem('username', e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
    let savedValue = localStorage.getItem('username');
    if (savedValue) {
        document.getElementById('form-input').value = savedValue;
    }
});

document.getElementById('form-form').addEventListener('submit', () => {
    localStorage.removeItem('username');
});
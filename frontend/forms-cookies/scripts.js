document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer myToken123'
            },
            body: formData
        });

        if (!response.ok) throw new Error('Ошибка: ', response.status);

        const data = await response.json();
        console.log('Отправлено:', data.form);

    } catch (error) {
        console.error('Ошибка: ', error);
    }
});

document.getElementById('login-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        
        console.log('Registro bem-sucedido!', data.token);
        localStorage.setItem('token', data.token);
        window.location.href = '../index.html';
    } catch (err) {
        console.log("erro no login, tente novamente mais tarde!", err.messagr);
    }
});

document.getElementById('post-form').addEventListener('submit', async(e) => {
    e.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    try {
        const response = await fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) {
            throw new Error('Failed to send post');
        }

        document.getElementById('post-form').style.display = 'none';
        document.getElementById('confirmation-message').style.display = 'block';

        setTimeout(() => {
            window.location.href = '../index.html';
        }, 2000);
    } catch (err) {
        console.error('Error sending post:', err);
    }
});
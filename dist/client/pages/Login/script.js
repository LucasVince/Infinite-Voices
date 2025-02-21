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
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '../Home/Home.html';
    } catch (err) {
        alert("erro no login, tente novamente mais tarde!", err.messagr);
        console.log("erro no login, tente novamente mais tarde!", err.messagr);
    }
});

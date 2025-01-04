document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = (document.getElementById('username') as HTMLInputElement).value;
    const password= (document.getElementById('password') as HTMLInputElement).value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        if(data.token) {
            console.log('bem sucedido!', data.token);
            localStorage.setItem('token',data.token);
        } else {
            console.log("erro no login, tente novamente mais tarde!")}
        })
        .catch(error => console.error('Erro na comunicação com o servidor:', error));
    })

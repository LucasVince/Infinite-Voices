"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
(_a = document.getElementById('login-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
        if (data.token) {
            console.log('bem sucedido!', data.token);
            localStorage.setItem('token', data.token);
        }
        else {
            console.log("erro no login, tente novamente mais tarde!");
        }
    })
        .catch(error => console.error('Erro na comunicação com o servidor:', error));
});

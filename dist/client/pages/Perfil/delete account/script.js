const passwordInput = document.querySelector('#password');
const btnTerminate = document.querySelector('#terminate');

const token = localStorage.getItem('token');
const userID = JSON.parse(localStorage.getItem('user'))._id;

if (!token) {
    window.location = '../../Login/index.html';
}

btnTerminate.addEventListener('click', async () => {
    const question = confirm('Terminate???');

    if (!question) {
        window.location = '../../Perfil/Perfil.html';
        return;
    }

    const password = passwordInput.value;
    try {
        
        const response = await fetch('http://localhost:8080/deleteaccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID, password, token})
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        passwordInput.value = '';

        window.location = '../../Register/index.html';
        localStorage.clear();
    } catch(err) {
        alert(err);
        console.log(err);
    }
});
const passwordInput = document.querySelector('#password');
const btnTerminate = document.querySelector('#terminate');

btnTerminate.addEventListener('click', async () => {
    const password = passwordInput.value;
    const token = localStorage.getItem('token');
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    try {
        const response = await fetch('http://localhost:8080/deleteAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID, password, token})
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        window.location = '../../Login/index.html';
    } catch(err) {
        alert(err);
        console.log(err);
    }
});
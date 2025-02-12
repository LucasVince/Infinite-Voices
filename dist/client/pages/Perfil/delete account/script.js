<<<<<<< HEAD
const passwordInput = document.querySelector('#password');
const btnTerminate = document.querySelector('#terminate');

btnTerminate.addEventListener('click', async () => {
    const password = passwordInput.value;
    const token = JSON.parse(localStorage.getItem('token'));
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    try {
        const response = await fetch('http://localhost:8080/deleteAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID, password, token})
        });

        const data = await response.json;

        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch(err) {
        alert(err);
        console.log(err);
    }
=======
const passwordInput = document.querySelector('#password');
const btnTerminate = document.querySelector('#terminate');

btnTerminate.addEventListener('click', async () => {
    const password = passwordInput.value;
    const token = JSON.parse(localStorage.getItem('token'));
    const userID = JSON.parse(localStorage.getItem('user'))._id;

    try {
        const response = await fetch('http://localhost:8080/deleteAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userID, password, token})
        });

        const data = await response.json;

        if (!response.ok) {
            throw new Error(data.message);
        }
    } catch(err) {
        alert(err);
        console.log(err);
    }
>>>>>>> 8d1c0568f42a134326c3b122c6760b8719678014
});
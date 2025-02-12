<<<<<<< HEAD
const changeElements = user => {

    const email = document.querySelectorAll('li')[0];
    const registerDate = document.querySelectorAll('li')[1];
    const createdPosts = document.querySelectorAll('li')[2];

    email.innerHTML = `<li><strong>Email:</strong> ${user.email}</li>`;
    registerDate.innerHTML = `<li><strong>Register Date:</strong> ${user.createdAt.slice(0, user.createdAt.indexOf('T')).replaceAll('-', '/')}</li>`;
    createdPosts.innerHTML = `<li><strong>Created Posts:</strong> ${user.posts}</li>`;
}

window.onload = async () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    try {
        const response = await fetch(`http://localhost:8080/users?userID=${userID}`, {
            method: 'GET',
            headers: {'content-type': 'application/json', 'page': 'profile'}
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }
        
        user = data.user;

        changeElements(user);
    } catch (err) {
        console.log(err.message);
    }
}

// --------------------------------------------

const saveChanges = document.querySelectorAll('.btn-edit-profile')[0];
const cancel = document.querySelectorAll('.btn-edit-profile')[1];

saveChanges.addEventListener('click', async () => {
    try {
        const username = document.querySelector('#username').value;
        const bio = document.querySelector('#bio').value;
        const status = document.querySelector('#status').value;
        const temporaryMessage = document.querySelector('#temporary-message').value;

        const userID = JSON.parse(localStorage.getItem('user'))._id;

        if (username == '' && bio == '' && temporaryMessage == '') {
            throw new Error('Please fill a least one field');
        }

        const response = await fetch('http://localhost:8080/users', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'page': 'profile'},
            body: JSON.stringify({ username, bio, status, temporaryMessage, userID }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        window.location.href = '../Perfil.html';
    } catch (err) {
        console.log(err.message);
    }
});

cancel.addEventListener('click', () => {
    const quitEditing = confirm('Are You sure you want to cancel?');

    if (quitEditing) {
        console.log('Cancelling');
        window.location.href = '../Perfil.html';
    }
=======
const changeElements = user => {

    const email = document.querySelectorAll('li')[0];
    const registerDate = document.querySelectorAll('li')[1];
    const createdPosts = document.querySelectorAll('li')[2];

    email.innerHTML = `<li><strong>Email:</strong> ${user.email}</li>`;
    registerDate.innerHTML = `<li><strong>Register Date:</strong> ${user.createdAt.slice(0, user.createdAt.indexOf('T')).replaceAll('-', '/')}</li>`;
    createdPosts.innerHTML = `<li><strong>Created Posts:</strong> ${user.posts}</li>`;
}

window.onload = async () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    try {
        const response = await fetch(`http://localhost:8080/users?userID=${userID}`, {
            method: 'GET',
            headers: {'content-type': 'application/json', 'page': 'profile'}
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }
        
        user = data.user;

        changeElements(user);
    } catch (err) {
        console.log(err.message);
    }
}

// --------------------------------------------

const saveChanges = document.querySelectorAll('.btn-edit-profile')[0];
const cancel = document.querySelectorAll('.btn-edit-profile')[1];

saveChanges.addEventListener('click', async () => {
    try {
        const username = document.querySelector('#username').value;
        const bio = document.querySelector('#bio').value;
        const status = document.querySelector('#status').value;
        const temporaryMessage = document.querySelector('#temporary-message').value;

        const userID = JSON.parse(localStorage.getItem('user'))._id;

        if (username == '' && bio == '' && temporaryMessage == '') {
            throw new Error('Please fill a least one field');
        }

        const response = await fetch('http://localhost:8080/users', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'page': 'profile'},
            body: JSON.stringify({ username, bio, status, temporaryMessage, userID }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        window.location.href = '../Perfil.html';
    } catch (err) {
        console.log(err.message);
    }
});

cancel.addEventListener('click', () => {
    const quitEditing = confirm('Are You sure you want to cancel?');

    if (quitEditing) {
        console.log('Cancelling');
        window.location.href = '../Perfil.html';
    }
>>>>>>> 8d1c0568f42a134326c3b122c6760b8719678014
});
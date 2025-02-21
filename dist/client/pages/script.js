const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '../Login/index.html';
}

const changeLocation = (url) => {
    document.querySelector('#transition').style.boxShadow = '10px 0 30px #00000044';
    document.querySelector('#transition').style.animation = 'transition-start ease-in-out 1s forwards';
    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#transition').style.boxShadow = '-10px 0 30px #00000044';
    document.querySelector('#transition').style.animation = 'transition-end ease-in-out 1s forwards';
});

document.getElementById('home').addEventListener('click', () => {
    changeLocation('../Home/Home.html');
});

document.getElementById('post').addEventListener('click', () => {
    changeLocation('../Post/Post.html');
});

document.getElementById('topics').addEventListener('click', () => {
    changeLocation('../Topics/Topics.html');
});

document.getElementById('profile').addEventListener('click', () => {
    changeLocation('../Profile/Profile.html');
});

document.getElementById('configs').addEventListener('click', () => {
    changeLocation('../Configs/Configurações.html');
});

document.getElementById('logout').addEventListener('click', async () => {

    try {
        const response = await fetch('http://localhost:8080/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token}),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '../Login/index.html';
    } catch (err) {
        console.log(err.message);
    }
});

document.getElementById('credits').addEventListener('click', () => {
    changeLocation('../Credits/Credits.html');
});
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '../Login/index.html';
}

document.getElementById('home').addEventListener('click', () => {
    window.location.href = '../Home/Home.html';
});

document.getElementById('post').addEventListener('click', () => {
    window.location.href = '../Post/Post.html';
});

document.getElementById('topics').addEventListener('click', () => {
    window.location.href = '../Topics/Topics.html';
});

document.getElementById('profile').addEventListener('click', () => {
    window.location.href = '../Profile/Profile.html';
});

document.getElementById('configs').addEventListener('click', () => {
    window.location.href = '../Configs/Configurações.html';
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
    window.location.href = '../Credits/Credits.html';
});
const token = localStorage.getItem('token');

if (!token) {
    window.location.href = '../Login/index.html';
}

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

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = './login/index.html';
}

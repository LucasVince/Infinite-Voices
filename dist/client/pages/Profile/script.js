const changeElements = user => {
    const profilePicture = document.querySelector('.profile-picture');
    const profileName = document.querySelector('.profile-name');
    const profileBio = document.querySelector('.profile-bio');

    if (user.avatar !== null) profilePicture.href = user.avatar;
    profileName.textContent = user.username;
    if (user.bio !== null) profileBio.textContent = `"${user.bio}"`;

    const email = document.querySelectorAll('li')[0];
    const registerDate = document.querySelectorAll('li')[1];
    const createdPosts = document.querySelectorAll('li')[2];
    const status = document.querySelectorAll('li')[3];
    const temporaryMessage = document.querySelectorAll('li')[4];

    email.innerHTML = `<li><strong>Email:</strong> ${user.email}</li>`;
    registerDate.innerHTML = `<li><strong>Register Date:</strong> ${user.createdAt.slice(0, user.createdAt.indexOf('T')).replaceAll('-', '/')}</li>`;
    createdPosts.innerHTML = `<li><strong>Created Posts:</strong> ${user.posts}</li>`;
    status.innerHTML = `<li><strong>Status:</strong> ${user.status}</li>`;
    if (user.temporaryMessage !== null) temporaryMessage.innerHTML = `<li><strong>Temporary Message:</strong> ${user.temporaryMessage}</li>`;
    else temporaryMessage.innerHTML = `<li><strong>Temporary Message:</strong> "Type something you are doing now"</li>`;
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

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));

        changeElements(user);
    } catch (err) {
        console.log(err.message);
    }
}

const deleteAcountButton = document.querySelector('.delete-acount');

deleteAcountButton.addEventListener('click', async () => {
    const deleteAcount = confirm('Are you sure you want to delete');

    if (deleteAcount) {
        window.location = './delete account/delete.html';
    }
});
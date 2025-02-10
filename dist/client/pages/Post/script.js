const titleInput = document.querySelector('#title');
const tagInput = document.querySelector('#tag');
const messageInput = document.querySelector('#message');

const btnSend = document.querySelector('#send');
const addTag = document.querySelector('#add-tag');

const chatMessages = document.querySelector('.chat-messages');

const user = JSON.parse(localStorage.getItem('user'));

const usernameImage = document.querySelector('.post-header .infos img');
const usernameParagraph = document.querySelector('.post-header .infos p');

const titleH1 = document.querySelector('.posts-content h1');
const contentParagraph = document.querySelector('.posts-content p');

usernameParagraph.textContent = user.username;
if (user.avatar !== null) usernameParagraph.href = user.avatar;

titleInput.addEventListener('input', () => {
    titleH1.textContent = titleInput.value;
});

const tags = [];

const tagsDiv = document.querySelector('.tags');

addTag.addEventListener('click', () => {
    if (tags.length >= 5) {
        alert('You can only add 5 tags');
        console.log('You can only add 5 tags');
        return;
    }

    const tag = tagInput.value.trim();

    if (tag.length <= 0) {
        alert('please type a tag to proceed');
        console.log('please type a tag to proceed');
        return;
    }

    tags.push(tag);

    tagInput.value = '';

    const tagParagraph = document.createElement('p');
    const tagContent = document.createTextNode('#' + tag);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';

    tagParagraph.appendChild(tagContent);
    tagParagraph.appendChild(deleteButton);

    tagsDiv.appendChild(tagParagraph);

    deleteButton.addEventListener('click', () => {
        tags.splice(tags.indexOf(tag), 1);
        tagsDiv.removeChild(tagParagraph);
    });
});

messageInput.addEventListener('input', () => {
    contentParagraph.textContent = messageInput.value;
});

btnSend.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const message = messageInput.value.trim();
    const user = JSON.parse(localStorage.getItem('user'));

    if (message.length === 0 || title.length === 0) {
        alert('Type Something To Post');
        console.log('Type Something To Post');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ title, message, user, tags }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        titleInput.value = '';
        messageInput.value = '';

        titleH1.textContent = '';
        contentParagraph.textContent = '';
        tagsDiv.textContent = '';
    } catch (err) {
        console.log(err.message);
    }
});
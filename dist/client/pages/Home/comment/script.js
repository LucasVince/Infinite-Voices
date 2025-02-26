const post = JSON.parse(localStorage.getItem('post'));

const avatar = post.author.avatar;
const username = post.author.username;
const title = post.title;
const content = post.content;
const tags = post.tags;

if (avatar !== null) document.querySelector('.infos img').src = avatar;
document.querySelector('.infos p').textContent = username;
document.querySelector('.posts-content h1').textContent = title;
document.querySelector('.posts-content p').textContent = content;

tags.forEach(tag => {
    const tagElement = document.createElement('p');
    tagElement.textContent = '#'+tag;
    document.querySelector('.tags').appendChild(tagElement);
}); 

const transition = document.createElement('div');

const generateDivTransition = () => {
    transition.id = 'transition';
    transition.style.position = 'fixed';
    transition.style.top = '0';
    transition.style.left = '0';
    transition.style.width = '100%';
    transition.style.height = '100%';
    transition.style.zIndex = '1000';
    transition.style.backgroundColor = 'white';

    document.body.appendChild(transition);
};

window.onload = ('DOMContentLoaded', () => {
    generateDivTransition();
    transition.style.animation = 'transition-end ease-in-out 1s forwards';
    getComments();
});

const back = document.getElementById('back');

back.addEventListener('click', () => {
    generateDivTransition();
    transition.style.animation = 'transition-start ease-in-out 1s forwards';
    setTimeout(() => {
        window.location = '../../Home/Home.html';
    }, 1000);
});

const submitComment = document.getElementById('submit-comment').addEventListener('click', async () => {
    const comment = document.getElementById('comment-text').value;
    const postId = post._id;
    const author = JSON.parse(localStorage.getItem('user'))._id;

    if (comment === '') alert('Comment is empty, pls type something');

    try {
        const response = await fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, postId, author })
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) throw new Error(data.message);

        document.getElementById('comment-text').value = '';

        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p><strong>${JSON.parse(localStorage.getItem('user')).username}:</strong> ${comment}</p>`;
        document.querySelector('.comments-container').appendChild(commentElement);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
});

const getComments = async () => {
    try {
        const response = await fetch(`http://localhost:8080/comments?postId=${post._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        console.log(data);

        data.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `<p><strong>${comment.author.username}:</strong> ${comment.commentContent}</p>`;
            document.querySelector('.comments-container').appendChild(commentElement);
        });
    } catch (error) {
        console.log(error);
    }
}
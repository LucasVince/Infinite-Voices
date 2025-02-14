const postsContainer = document.querySelector('.posts-container');
let currentPage = 0;
let loading = false;

const gerarPosts = post => {
    post.forEach(el => {
        const divPost = document.createElement('div');
        const divPostHeader = document.createElement('div');
        const divPostHeaderInfos = document.createElement('div');
        const divPostHeaderTags = document.createElement('div');
        const divPostContent = document.createElement('div');
        const divPostAtatchment = document.createElement('div');
        const paragraphUsername = document.createElement('p');
        const paragraphContent = document.createElement('p');
        const titleContent = document.createElement('h1');
        const userAvatar = document.createElement('img');

        divPost.id = el._id;
        divPost.classList.add('post');
        divPostHeader.classList.add('post-header');
        divPostHeaderInfos.classList.add('infos');
        divPostHeaderTags.classList.add('tags');
        divPostContent.classList.add('posts-content');
        divPostAtatchment.classList.add('post-atachments');

        if (el.author.avatar !== null) userAvatar.src = el.author.avatar;
        else userAvatar.src = '../../imgs/avatar_default.jpg';

        const username = document.createTextNode(el.author.username);
        const title = document.createTextNode(el.title);
        const content = document.createTextNode(el.content);

        postsContainer.appendChild(divPost);
        divPost.appendChild(divPostHeader);
        divPost.appendChild(divPostContent);
        divPost.appendChild(divPostAtatchment);
        divPostHeader.appendChild(divPostHeaderInfos);
        divPostHeader.appendChild(divPostHeaderTags);

        divPostHeaderInfos.appendChild(userAvatar);
        divPostHeaderInfos.appendChild(paragraphUsername);
        paragraphUsername.appendChild(username);
        
        el.tags.forEach(el => {
            const paragraphTag = document.createElement('p');
            const tagContent = document.createTextNode('#' + el);

            paragraphTag.appendChild(tagContent);

            divPostHeaderTags.appendChild(paragraphTag);
        });

        divPostContent.appendChild(titleContent);
        titleContent.appendChild(title);
        divPostContent.appendChild(paragraphContent);
        paragraphContent.appendChild(content);

        if (JSON.parse(localStorage.getItem('user'))._id == el.author._id) {
            const deleteDiv = document.createElement('div');
            const deleteButton = document.createElement('button');

            deleteDiv.classList.add('delete-div');
            deleteButton.id = 'delete-button';

            divPost.appendChild(deleteDiv);
            deleteDiv.appendChild(deleteButton);
            deleteButton.textContent = '🗑️';

            deleteButton.addEventListener('click', () => deletePost(el));
        }

        const deleteDiv = document.createElement('div');
        const deleteButton = document.createElement('button');
        
        deleteDiv.classList.add('comment-div');
        deleteButton.id = 'comment-button';

        divPost.appendChild(deleteDiv);
        deleteDiv.appendChild(deleteButton);
        deleteButton.textContent = 'Interact with the post';

        deleteButton.addEventListener('click', () => window.location = './comment/comment.html');
    });
}

const deletePost = async post => {
    const del = confirm('do you realy want to delete this post???');

    if (!del) {
        return;
    }

    const postId = post._id;
    try {
        const response = await fetch(`http://localhost:8080/posts?postId=${postId}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json', 'page': 'home'}
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        const element = document.getElementById(postId);
        element.remove();
    } catch (err) {
        console.log(err.message);
    }
}

const carregarPosts = async () => {
    if (loading) return;
    try {
        loading = true;
        const response = await fetch(`http://localhost:8080/posts?currentPage=${currentPage}`, {
            method: 'GET',
            headers: {'content-type': 'application/json', 'page': 'home'}
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }
        
        posts = data.posts;
        
        gerarPosts(posts);

        currentPage++;
        loading = false;
    } catch (err) {
        loading = false;
        console.log(err.message);
    }
}

window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight;
    const scroll = window.scrollY + window.innerHeight;

    if (scroll >= height * 0.9) {
        carregarPosts();
    }
});

window.addEventListener('DOMContentLoaded', carregarPosts());
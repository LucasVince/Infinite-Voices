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

        // Criar o link para a página de detalhes do post
        const postLink = document.createElement('a');
        postLink.href = `../comment/comment.html?id=${el.id}`; // Redireciona para a página de detalhes
        postLink.classList.add('post-link');

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

        divPostContent.appendChild(postLink);
        postLink.appendChild(titleContent);
        titleContent.appendChild(title);
        divPostContent.appendChild(paragraphContent);
        paragraphContent.appendChild(content);
    });
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

window.addEventListener('DOMContentLoaded', carregarPosts);

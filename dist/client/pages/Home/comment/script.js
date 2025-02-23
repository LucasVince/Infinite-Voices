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

window.addEventListener('DOMContentLoaded', () => {
    generateDivTransition();
    transition.style.animation = 'transition-end ease-in-out 1s forwards';
});

const back = document.getElementById('back');

back.addEventListener('click', () => {
    generateDivTransition();
    transition.style.animation = 'transition-start ease-in-out 1s forwards';
    setTimeout(() => {
        window.location = '../../Home/Home.html';
    }, 1000);
});
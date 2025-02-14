const GabrielNat1Img = document.querySelector('#gabriel-devs-pic');
const LucasVinceImg = document.querySelector('#lucasvince-pic');

const GabrielNat1Nick = document.querySelectorAll('.profile-info h2')[0];
const LucasVinceNick = document.querySelectorAll('.profile-info h2')[1];

const GabrielNat1Bio = document.querySelectorAll('.profile-info p')[0];
const LucasVinceBio = document.querySelectorAll('.profile-info p')[1];

const GabrielNat1Url = document.querySelectorAll('.profile-info a')[0];
const LucasVinceUrl = document.querySelectorAll('.profile-info a')[1];

const GabrielNat1Repos = document.querySelectorAll('.repos p')[0];
const LucasVinceRepos = document.querySelectorAll('.repos p')[1];

const GabrielNat1Followers = document.querySelectorAll('.followers p')[0];
const LucasVinceFollowers = document.querySelectorAll('.followers p')[1];

const GabrielNat1Following = document.querySelectorAll('.following p')[0];
const LucasVinceFollowing = document.querySelectorAll('.following p')[1];

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const responseGabrielNat1 = await fetch('https://api.github.com/users/GabrielNat1');
        const responseLucasVince = await fetch('https://api.github.com/users/LucasVince');

        const dataGabrielNat1 = await responseGabrielNat1.json();
        const dataLucasVince = await responseLucasVince.json();

        if (!responseLucasVince.ok || !responseGabrielNat1.ok) {
            throw new Error(dataGabrielNat1.message);
            throw new Error(dataLucasVince.message);
        }

        console.log(dataGabrielNat1);
        console.log(dataLucasVince);
        
        GabrielNat1Img.src = dataGabrielNat1.avatar_url;
        LucasVinceImg.src = dataLucasVince.avatar_url;

        GabrielNat1Nick.innerHTML = dataGabrielNat1.login;
        LucasVinceNick.innerHTML = dataLucasVince.login;

        GabrielNat1Bio.innerHTML = dataGabrielNat1.bio;
        LucasVinceBio.innerHTML = dataLucasVince.bio;

        GabrielNat1Url.href = dataGabrielNat1.html_url;
        GabrielNat1Url.textContent = dataGabrielNat1.html_url;
        LucasVinceUrl.href = dataLucasVince.html_url;
        LucasVinceUrl.textContent = dataLucasVince.html_url;

        GabrielNat1Repos.textContent = dataGabrielNat1.public_repos + ' repositories';
        LucasVinceRepos.textContent = dataLucasVince.public_repos + ' repositories';

        GabrielNat1Followers.textContent = dataGabrielNat1.followers + ' followers';
        LucasVinceFollowers.textContent = dataLucasVince.followers + ' followers';

        GabrielNat1Following.textContent = 'following ' + dataGabrielNat1.following;
        LucasVinceFollowing.textContent = 'following ' + dataLucasVince.following;
    } catch (err) {
        console.log(err);
    }
});
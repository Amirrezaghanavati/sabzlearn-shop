import {
    getMe
} from './auth.js'

import {
    isLogin
} from './utils.js';

const showUserNameInNavbar = () => {
    const isUserLogin = isLogin()
    const navbarProfileBox = document.querySelector('.main-header__profile');

    if (isUserLogin) {
        const userInfos = getMe().then(result => {
            navbarProfileBox.setAttribute('href', 'index.html');
            navbarProfileBox.innerHTML = `<span class="main-header__profile-text">${result.name}</span>`
        })
    } else {
        navbarProfileBox.setAttribute('href', 'login.html')
        navbarProfileBox.innerHTML = `<span class="main-header__profile-text">ثبت نام / ورود</span>`
    }
}


const renderTopBarMenus = async () => {
    const topBarList = document.querySelector('.top-bar__menu');

    topBarList.innerHTML = '';
    const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
    const topBarMenus = await res.json();

    const shuffledArray = topBarMenus.sort((a, b) => 0.5 - Math.random());
    console.log(shuffledArray);


    shuffledArray.slice(0, 6).map(menu => {
        topBarList.innerHTML += `<li class="top-bar__item">
                <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
              </li>`
    })
}

export {
    showUserNameInNavbar,
    renderTopBarMenus
}
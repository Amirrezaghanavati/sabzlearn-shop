import {
    login, getMe
} from "./funcs/auth.js";


const button = document.getElementById('login-btn');

getMe();

button.addEventListener('click', event => {
     event.preventDefault();
     login();

})
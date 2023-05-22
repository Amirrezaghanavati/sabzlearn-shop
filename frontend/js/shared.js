import {
    showUserNameInNavbar, renderTopBarMenus
} from "./funcs/shared.js";

window.addEventListener('load', () => {
    showUserNameInNavbar();
    renderTopBarMenus();
})
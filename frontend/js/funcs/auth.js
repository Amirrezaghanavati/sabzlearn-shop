import {
    showSwal,
    saveIntoLocalStorage,
    getToken
} from "./utils.js";


const $ = document;

const register = () => {
    const nameInput = $.querySelector('#name');
    const usernameInput = $.querySelector('#username');
    const emailInput = $.querySelector('#email');
    const phoneInput = $.querySelector('#phone');
    const passwordInput = $.querySelector('#password');

    const newUserInfos = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim()
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUserInfos)
        }).then(res => {
            if (res.status === 201) {
                showSwal("با موفقیت ثبت نام شدید", "success", "باشه", (result) => {
                    location.href = 'index.html'
                })
            } else if (res.status === 409) {
                showSwal("نام کاربری یا ایمیل قبلا استفاده شده", "error", "باشه", () => {})
            }

            return res.json();
        })
        .then(result => {
            saveIntoLocalStorage('user', {
                token: result.accessToken
            })
        })
}

const login = () => {
    const identifierInput = $.querySelector('#identifier');
    const passwordInput = $.querySelector('#password');

    const userInfos = {
        identifier: identifierInput.value.trim(),
        password: passwordInput.value.trim()
    };

    fetch(`http://localhost:4000/v1/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfos),
    }).then(res => {
        if (res.status === 200) {
            showSwal("با موفقیت وارد شدید", "success", "باشه", (result) => {
                location.href = 'index.html'
            })
        } else if (res.status === 401) {
            showSwal("نام کاربری یا ایمیل نامعتبر است", "error", "باشه", () => {})
        }

        return res.json();
    }).then(result => {

        saveIntoLocalStorage('user', {
            token: result.accessToken
        })
    });
}

const getMe = async () => {
    const token = getToken();
    if (!token) {
        return false
    }
    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = await res.json();

    return data;
}


export {
    register,
    login,
    getMe
};
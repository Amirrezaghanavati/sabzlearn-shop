const $ = document;
const landingTitle = $.querySelector('.landing__title');
const landingCoursesCount = $.querySelector('#courses_count');
const landingMinutesCount = $.querySelector('#minutes_count');
const landingUsersCount = $.querySelector('#users_count');

window.addEventListener('load', () => {
    let landingText = 'ما به هر قیمتی دوره اموزشی تهیه نمیکنیم !';
    let typeIndex = 0;

    typeWriter(landingText, typeIndex);
    makeCounter(80, landingCoursesCount);
    makeCounter(3222, landingMinutesCount);
    makeCounter(3071, landingUsersCount);
})


function typeWriter(text, index) {
    if (index < text.length) {
        landingTitle.innerHTML += text[index];
        index++;
    }


    setTimeout(() => {
        typeWriter(text, index);
    }, 100)
}


//set interval 
function makeCounter(max, element){
let counter = 0;

const interval = setInterval(() => {
    if (counter === max) {
        clearInterval(interval);
    }

    element.innerHTML = counter;
    counter++;


}, .05)
}
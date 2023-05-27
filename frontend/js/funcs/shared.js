import {
  getMe
} from './auth.js'

import {
  isLogin, getUrlParam
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

  shuffledArray.slice(0, 6).map(menu => {
    topBarList.innerHTML += `<li class="top-bar__item">
                <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
              </li>`
  })
}

const getAndShowCourses = async () => {
  const coursesContainer = document.querySelector('#courses-container');


  const res = await fetch(`http://localhost:4000/v1/courses`);
  const courseInfos = await res.json();



  coursesContainer.innerHTML = '';
  courseInfos.slice(0, 6).map((courseInfo) => {
    const newCourse = `<div class="col-4">
                <div class="course-box">
                  <a href="#">
                    <img src=http://localhost:4000/courses/covers/${courseInfo.cover} class="course-box__img">
                  </a>
                  <div class="course-box__main">
                    <a href = "#"
                    class = "course-box__title">${courseInfo.name} </a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user course-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                        <a href="#" class="course-box__teacher-link">${courseInfo.creator}</a>
                      </div>
                      <div class="course-box__rating">

                      ${
                        Array(5 - courseInfo.courseAverageScore).fill(0).map(score =>
                          '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        ).join(' ')
                      }
                      ${
                        Array(courseInfo.courseAverageScore).fill(0).map(score => 
                          '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        ).join(' ')}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <svg class="svg-inline--fa fa-users course-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="fas fa-users course-box__users-icon"></i> Font Awesome fontawesome.com -->
                        <span class="course-box__users-text">${courseInfo.registers}</span>
                      </div>
                      <span class="course-box__price">${courseInfo.price === 0 ? 'رایگان' : courseInfo.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <svg class="svg-inline--fa fa-arrow-left course-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg><!-- <i class="fas fa-arrow-left course-box__footer-icon"></i> Font Awesome fontawesome.com -->
                    </a>
                  </div>

                </div>
              </div>`;
    coursesContainer.insertAdjacentHTML("beforeend", newCourse)
  })

}

const getAndShowPopularCourses = async () => {
  const popularCoursesWrapper = document.querySelector('#popular-courses-wrapper');

  const res = await fetch('http://localhost:4000/v1/courses/popular')
  const popularCoursesInfos = await res.json();

  popularCoursesWrapper.innerHTML = '';
  popularCoursesInfos.forEach((popularCourseInfo) => {

    popularCoursesWrapper.insertAdjacentHTML("beforeend", `<div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" role="group" aria-label="3 / 4" style="width: 472.5px;" data-swiper-slide-index="2">
                <div class="course-box">
                  <a href="#">
                    <img src=http://localhost:4000/courses/covers/${popularCourseInfo.cover} class="course-box__img">
                  </a>
                  <div class="course-box__main">
                    <a href="#" class="course-box__title">${popularCourseInfo.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user course-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                        <a href="#" class="course-box__teacher-link">${popularCourseInfo.creator}</a>
                      </div>
                      <div class="course-box__rating">
                        ${
                        Array(5 - popularCourseInfo.courseAverageScore).fill(0).map(score =>
                          '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        ).join(' ')
                      }
                      ${
                        Array(popularCourseInfo.courseAverageScore).fill(0).map(score =>
                          '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        ).join(' ')}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <svg class="svg-inline--fa fa-users course-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="fas fa-users course-box__users-icon"></i> Font Awesome fontawesome.com -->
                        <span class="course-box__users-text">${popularCourseInfo.registers}</span>
                      </div>
                      <span class="course-box__price">${popularCourseInfo.price === 0 ? 'رایگان' : popularCourseInfo.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <svg class="svg-inline--fa fa-arrow-left course-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg><!-- <i class="fas fa-arrow-left course-box__footer-icon"></i> Font Awesome fontawesome.com -->
                    </a>
                  </div>

                </div>
              </div>`)
  })

  return popularCoursesInfos;

}

const getAndShowPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector('#presell-courses-wrapper');

  const res = await fetch('http://localhost:4000/v1/courses/presell')
  const presellCoursesInfos = await res.json();

  presellCoursesWrapper.innerHTML = '';
  presellCoursesInfos.forEach((courses) => {

    presellCoursesWrapper.insertAdjacentHTML("beforeend", `<div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" role="group" aria-label="3 / 4" style="width: 472.5px;" data-swiper-slide-index="2">
                <div class="course-box">
                  <a href="#">
                    <img src=http://localhost:4000/courses/covers/${courses.cover} class="course-box__img">
                  </a>
                  <div class="course-box__main">
                    <a href="#" class="course-box__title">${courses.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user course-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                        <a href="#" class="course-box__teacher-link">${courses.creator}</a>
                      </div>
                      <div class="course-box__rating">
                        ${
                        Array(5 - courses.courseAverageScore).fill(0).map(score =>
                          '<img src="images/svgs/star.svg" alt="rating" class="course-box__star">'
                        ).join(' ')
                      }
                      ${
                        Array(courses.courseAverageScore).fill(0).map(score =>
                          '<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">'
                        ).join(' ')}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <svg class="svg-inline--fa fa-users course-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="fas fa-users course-box__users-icon"></i> Font Awesome fontawesome.com -->
                        <span class="course-box__users-text">${courses.registers}</span>
                      </div>
                      <span class="course-box__price">${courses.price === 0 ? 'رایگان' : courses.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <svg class="svg-inline--fa fa-arrow-left course-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg><!-- <i class="fas fa-arrow-left course-box__footer-icon"></i> Font Awesome fontawesome.com -->
                    </a>
                  </div>

                </div>
              </div>`)
  })

  return presellCoursesInfos;

}

const getAndShowArticles = async () => {

  const articlesWrapper = document.querySelector('#articles-wrapper');

  const res = await fetch('http://localhost:4000/v1/articles');

  const articleInfos = await res.json();

  articlesWrapper.innerHTML = '';

  articleInfos.slice(0, 6).forEach(article => {
    articlesWrapper.insertAdjacentHTML('beforeend', `<div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                  ${article.title}
                  </a>
                  <p class="article-card__text">
                  ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>`)
  })

  return articleInfos
}

const getAndShowNavbarMenus = async () => {
  const menusWrapper = document.querySelector('#menus-wrapper')

  const res = await fetch('http://localhost:4000/v1/menus');
  const allMenus = await res.json();


  allMenus.forEach(menu => {
    menusWrapper.insertAdjacentHTML('beforeend', `<li class="main-header__item">
                <a href=category.html?cat=${menu.href.split('/')[2]} class="main-header__link">${menu.title}
                  ${menu.submenus.length !== 0 ? `<i class="fas fa-angle-down main-header__link-icon"></i><ul class="main-header__dropdown">
                  ${menu.submenus.map((submenu) => (
                    `<li class="main-header__dropdown-item">
                      <a href="#" class="main-header__dropdown-link">${submenu.title}</a>
                    </li>`
                  )).join('')}
                  </ul>`
                : ''}
                </a>
              </li>`
              )
            })
  return allMenus;
}

const getAndShowCategoryCourses = async () => {
 const categoryName = getUrlParam('cat');
 const coursesWrapper = document.querySelector('#courses-wrapper')

 const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
//  const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
 
 const courses = await res.json()
//  console.log(courses);

 coursesWrapper.innerHTML = ''
 if (courses.length) {
 courses.forEach(course => {
  coursesWrapper.insertAdjacentHTML('beforeend', `<div class="col-4">
                <div class="course-box">
                  <a href="#">
                    <img src="images/courses/jango.png" alt="Course img" class="course-box__img">
                  </a>
                  <div class="course-box__main">
                    <a href="#" class="course-box__title">${course.title}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <svg class="svg-inline--fa fa-chalkboard-user course-box__teacher-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chalkboard-user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M592 0h-384C181.5 0 160 22.25 160 49.63V96c23.42 0 45.1 6.781 63.1 17.81V64h352v288h-64V304c0-8.838-7.164-16-16-16h-96c-8.836 0-16 7.162-16 16V352H287.3c22.07 16.48 39.54 38.5 50.76 64h253.9C618.5 416 640 393.8 640 366.4V49.63C640 22.25 618.5 0 592 0zM160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352z"></path></svg><!-- <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i> Font Awesome fontawesome.com -->
                        <a href="#" class="course-box__teacher-link">رضا دولتی</a>
                      </div>
                      <div class="course-box__rating">
                        <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                        <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <svg class="svg-inline--fa fa-users course-box__users-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z"></path></svg><!-- <i class="fas fa-users course-box__users-icon"></i> Font Awesome fontawesome.com -->
                        <span class="course-box__users-text">500</span>
                      </div>
                      <span class="course-box__price">1,000,000</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <svg class="svg-inline--fa fa-arrow-left course-box__footer-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"></path></svg><!-- <i class="fas fa-arrow-left course-box__footer-icon"></i> Font Awesome fontawesome.com -->
                    </a>
                  </div>

                </div>
              </div>`)
 })}


 return courses;

}

export {
  showUserNameInNavbar,
  renderTopBarMenus,
  getAndShowCourses,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus, 
  getAndShowCategoryCourses
}
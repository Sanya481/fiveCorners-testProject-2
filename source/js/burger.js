const header = document.querySelector('.header');
const headerBlock = header.querySelector('.header__block');
const headerLogo = header.querySelector('.header__logo');
const burger = header.querySelector('.burger');
const nav = header.querySelector('.nav');
const headerLogoTablet = header.querySelector('.header__logo-tablet');
const headerLogoFull = header.querySelector('.header__logo-desktop');

burger.addEventListener('click', function () {
  burger.classList.toggle('burger--open');
  nav.classList.toggle('nav--closed');
  header.classList.toggle('header--white');
  headerLogo.classList.toggle('header__logo--blue');
  headerLogoTablet.classList.toggle('none');
  headerBlock.classList.toggle('margin');  // Класс margin убирает margin-left у блока header__block в планшетной версии при открытом меню
  headerLogoFull.classList.toggle('block'); // Класс block задает display:block логотипу в планшетной версии при открытом меню идобавляется к изображению с классом header__logo-desktop
})

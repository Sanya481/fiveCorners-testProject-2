/* Меню в мобилке */

const body = document.body;
const header = document.querySelector('[data-header]');
const burger = document.querySelector('[data-burger]');
const nav = document.querySelector('[data-mobile-nav]');
const logo = document.querySelector('[data-logo]');

const isEscKey = (evt) => evt.key === 'Escape';

/**
 * Закрытие меню при нажатии на Escape
 */
const onEscKeyPress = (evt) => {
  if (isEscKey(evt)) {
    closeMobileMenu();
  }
}

// const onOverlayClick = (evt) => {
//   const overlayElements = !evt.composedPath().includes(nav);
//   const overlayHeader = !evt.composedPath().includes(header);

//   if (overlayElements && overlayHeader) {
//     closeMobileMenu();
//   }
// }

/**
 * Открытие меню
 */
const onOpenMobileMenu = (evt) => {
  evt.stopPropagation();

  body.classList.toggle('shadow');
  body.classList.toggle('scroll-lock');
  burger.classList.toggle('is-open');
  nav.classList.toggle('is-open');
  header.classList.toggle('is-open');
  logo.classList.toggle('is-open');

  document.addEventListener('keydown', onEscKeyPress);
  // document.addEventListener('click', onOverlayClick);
}

/**
 * Закрытие меню
 */
function closeMobileMenu() {
  body.classList.remove('shadow');
  body.classList.remove('scroll-lock');
  burger.classList.remove('is-open');
  nav.classList.remove('is-open');
  header.classList.remove('is-open');
  logo.classList.remove('is-open');

  document.removeEventListener('keydown', onEscKeyPress);
  // document.removeEventListener('click', onOverlayClick);

}

if (window.matchMedia('(max-width: 767px)').matches) {
  if (burger) {
    burger.addEventListener('click', onOpenMobileMenu);
  }
}


/* Реализация счетчика */

/**
 * Форма оформления заказа
 */
const makingOrderForm = document.querySelector('[data-making-order-form]');

/* Запись общего кол-ва рядом с иконкой */
let totalQuantityInBasket = document.querySelector('[data-total-quantity-in-basket]');


/**
 * Получение общего кол-ва
 */
const calculateTotalQuantity = () => {
  /* Все счетчики - поля input  */
  const counters = document.querySelectorAll('[data-counter]');

  /* Общее количество */
  let totalQuantity = 0;

  /* Складываем общее кол-во */
  counters.forEach((counter) => {
    totalQuantity = totalQuantity + parseInt(counter.value);

    /* В моб.версии может не быть подсчета обшего кол-ва - проверяем */
    if (totalQuantityInBasket) {
      totalQuantityInBasket.textContent = totalQuantity;
    }
  })
}

/* ! При загрузке страницы сразу проверяем общее кол-во */
/* !!! В будущем можно убрать выполнение этой функции в моб.версии, чтобы ни делать лишних движений */
calculateTotalQuantity();

/**
 * Изменение кол-ва при нажатии Плюс либо Минус
 */
const onSelectQuantityProduct = (evt) => {
  /* Счётчик - поле input. */
  // Вынес для глобальной области видимости
  let counter;

  if (evt.target.dataset.action === 'minus' || evt.target.dataset.action === 'plus') {
    const counterWrapper = evt.target.closest('[data-counter-wrapper]');
    counter = counterWrapper.querySelector('[data-counter]');
  }

  if (evt.target.dataset.action === 'minus') {
    if (counter.valueAsNumber > 1) {
      counter.value--;

      calculateTotalQuantity();
    }
  }

  if (evt.target.dataset.action === 'plus') {
      if (counter.valueAsNumber < parseInt(counter.max)) {
        counter.value++;

        calculateTotalQuantity();
      }
    }
  }

  if (makingOrderForm) {
    makingOrderForm.addEventListener('click', onSelectQuantityProduct);
  }



// const navMain = document.querySelector('.main-nav');
// const navToggle = document.querySelector('.main-nav__toggle');

// navMain.classList.remove('main-nav--nojs');

// navToggle.addEventListener('click', function() {
//   if (navMain.classList.contains('main-nav--closed')) {
//     navMain.classList.remove('main-nav--closed');
//     navMain.classList.add('main-nav--opened');
//   } else {
//     navMain.classList.add('main-nav--closed');
//     navMain.classList.remove('main-nav--opened');
//   }
// });

// const link = document.querySelector('.js-login');
// const popup = document.querySelector('.modal');
// const close = popup.querySelector('.modal__button--close');
// const form = popup.querySelector('form');
// const login = popup.querySelector('[name=login]');
// const password = popup.querySelector('[name=password]');

// let isStorageSupport = true;
// let storage = '';

// try {
//   storage = localStorage.getItem('login');
// } catch (err) {
//   isStorageSupport = false;
// }

// link.addEventListener('click', function (evt) {
//   evt.preventDefault();
//   popup.classList.add('modal--show');

//   if (storage) {
//     login.value = storage;
//     password.focus();
//   } else {
//     login.focus();
//   }
// });

// close.addEventListener('click', function (evt) {
//   evt.preventDefault();
//   popup.classList.remove('modal--show');
//   popup.classList.remove('modal--error');
// });

// form.addEventListener('submit', function (evt) {
//   if (!login.value || !password.value) {
//     evt.preventDefault();
//     popup.classList.remove('modal--error');
//     popup.offsetWidth = popup.offsetWidth;
//     popup.classList.add('modal--error');
//   } else {
//     if (isStorageSupport) {
//       localStorage.setItem('login', login.value);
//     }
//   }
// });

// window.addEventListener('keydown', function (evt) {
//   if (evt.keyCode === 27) {
//     evt.preventDefault();

//     if (popup.classList.contains('modal--show')) {
//       popup.classList.remove('modal--show');
//       popup.classList.remove('modal--error');
//     }
//   }
// });

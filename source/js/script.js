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

if (window.matchMedia('(max-width: 1200px)').matches) {
  if (burger) {
    burger.addEventListener('click', onOpenMobileMenu);
  }
}

/* Показ количества товара в корзине */
const checkProductsQuantity = () => {
  // Эл-т для вставки количества
  const totalQuantity = document.querySelector('[data-total-quantity]');
  // Общее кол-во товаров
  const productsList = document.querySelectorAll('[data-product-wrapper]').length;

  totalQuantity.textContent = productsList;
}

window.addEventListener('DOMContentLoaded', () => {

  checkProductsQuantity();
})



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
  // Общее кол-во товаров
  const productsList = document.querySelectorAll('[data-product-wrapper]').length;
  // Счетчик товаров в корзине над иконкой
  const totalQuantityInBasket = document.querySelector('[data-total-quantity-in-basket]');


  /* Общее количество */
  let totalQuantity = 0;

  /* Если товаров нет в корзине - иконку над корзиной убираем */
  if (productsList === 0) {
    totalQuantityInBasket.style.opacity = 0;
  }

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


/* Сбор информации с формы */
const form = document.querySelector('[data-making-order-form]');

// Вариант 1
const onGetInfoFormField = (evt) => {
  evt.preventDefault();

  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());

  console.log(values);
}

// Вариант 2

// const isCheckboxOrRadio = type = ['checkbox', 'radio'].includes(type);

// const onGetInfoFormField = (evt) => {
//   evt.preventDefault();

//   // С помощью деструктуризации берем все элементы у формы
//   const { elements } = form;
//   // То же самое
//   // const elements = form.elements;

//   const data = new FormData();

//   Array.from(elements)
//   .filter((item) => !!item.name)
//   .forEach((element) => {
//     const {name, type} = element;
//     const value = type === 'checkbox' || 'radio' ? element.checked : element.value;

//     data.append(name, value);
//     console.log(Array.from(data.entries()));
//   } )
// }

// const {elements} = form;
// const elements = form.elements;



// console.log(elements);

if (form) {
  form.addEventListener('submit', onGetInfoFormField);
}


/* Промокод - появление кнопки при вводе промокода */
const promoCodeBlock = document.querySelector('[data-promo-code-block]');

/* Подписка на рассылку - появление кнопки при вводе промокода */
const subscriptionBlock = document.querySelector('[data-subscription-block]');

/* Поиск адреса на карте */
const addressBlock = document.querySelector('[data-address-block]');

/* Поиск по сайту */
const searchBlock = document.querySelector('[data-search-block]');


// !!! метод trim() позволяет удалить пробелы с обоих концов строки
/**
 * Проверка на пустую строку
 * @param {string} string - вводимые пользователем данные
 * @param {HTMLElement} btn - кнопка, которая должна появится при вводе данных
 */
const isEmptyString = (string, btn) => {
  if (string.trim() != "") {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}

/* Промокод */
if (promoCodeBlock) {

  const promoCodeField = promoCodeBlock.querySelector('[data-promo-code-field]');
  const promoCodeBtn = promoCodeBlock.querySelector('[data-promo-code-btn]');

  const onShowPromoCodeBtn = () => {
    isEmptyString(promoCodeField.value, promoCodeBtn)
  }

  promoCodeField.addEventListener('input', onShowPromoCodeBtn);
}

/* Подписка на рассылку */
if (subscriptionBlock) {

  const subscriptionField = subscriptionBlock.querySelector('[data-subscription-field]');
  const subscriptionBtn = subscriptionBlock.querySelector('[data-subscription-btn]');

  const onShowSubscriptionBtn = () => {
    isEmptyString(subscriptionField.value, subscriptionBtn)
  }

  subscriptionField.addEventListener('input', onShowSubscriptionBtn);
}

/* Поиск на карте */
if (addressBlock) {

  const addressField = addressBlock.querySelector('[data-address-field]');
  const addressBtn = addressBlock.querySelector('[data-address-btn]');

  const onShowAddressBtn = () => {
    isEmptyString(addressField.value, addressBtn)
  }

  addressField.addEventListener('input', onShowAddressBtn);
}

/* Поиску по сайту */
if (searchBlock) {

  const searchField = searchBlock.querySelector('[data-search-field]');
  const searchBtn = searchBlock.querySelector('[data-search-btn]');

  const onShowsearchBtn = () => {
    isEmptyString(searchField.value, searchBtn)
  }

  searchField.addEventListener('input', onShowsearchBtn);
}



// ==============
/* Подключение карты на сайт и поиск адреса введенного пользователем */

const map = document.querySelector('[data-map]');
const addressSearchBtn = document.querySelector('[data-address-btn]');

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

const center = [55.76, 37.64];

function init() {
  // Создание карты.
  const myMap = new ymaps.Map(map, {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: center,
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 7
  });



  function onGetAddress(evt) {
    const addressBlock = evt.target.closest('[data-address-block]');
    const addressField = addressBlock.querySelector('[data-address-field]').value;

    // Поиск координат .
    ymaps.geocode(addressField, {
      /**
       * Опции запроса
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
       */
      // Сортировка результатов от центра окна карты.
      // boundedBy: myMap.getBounds(),
      // strictBounds: true,
      // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
      // Если нужен только один результат, экономим трафик пользователей.
      results: 1
    }).then(function (res) {
      // Выбираем первый результат геокодирования.
      var firstGeoObject = res.geoObjects.get(0),
        // Координаты геообъекта.
        coords = firstGeoObject.geometry.getCoordinates(),
        // Область видимости геообъекта.
        bounds = firstGeoObject.properties.get('boundedBy');

      firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
      // Получаем строку с адресом и выводим в иконке геообъекта.
      firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

      // Добавляем первый найденный геообъект на карту.
      myMap.geoObjects.add(firstGeoObject);
      // Масштабируем карту на область видимости геообъекта.
      myMap.setBounds(bounds, {
        // Проверяем наличие тайлов на данном масштабе.
        checkZoomRange: true
      });

      /**
       * Все данные в виде javascript-объекта.
       */
      // console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
      /**
       * Метаданные запроса и ответа геокодера.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
       */
      // console.log('Метаданные ответа геокодера: ', res.metaData);
      /**
       * Метаданные геокодера, возвращаемые для найденного объекта.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
       */
      // console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
      /**
       * Точность ответа (precision) возвращается только для домов.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
       */
      // console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
      /**
       * Тип найденного объекта (kind).
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
       */
      // console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
      // console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
      // console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
      // console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
      /**
      * Прямые методы для работы с результатами геокодирования.
      * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
      */
      // console.log('\nГосударство: %s', firstGeoObject.getCountry());
      // console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
      // console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
      // console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
      // console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');

      /**
       * Если нужно добавить по найденным геокодером координатам метку со своими стилями и контентом балуна, создаем новую метку по координатам найденной и добавляем ее на карту вместо найденной.
       */
      /**
       var myPlacemark = new ymaps.Placemark(coords, {
       iconContent: 'моя метка',
       balloonContent: 'Содержимое балуна <strong>моей метки</strong>'
       }, {
       preset: 'islands#violetStretchyIcon'
       });

       myMap.geoObjects.add(myPlacemark);
       */
    });
  }

  // !! Опции !!
  // // удаляем геолокацию
  // myMap.controls.remove('geolocationControl');
  // // удаляем поиск
  // myMap.controls.remove('searchControl');
  // // удаляем контроль трафика
  // myMap.controls.remove('trafficControl');
  // // удаляем тип
  // myMap.controls.remove('typeSelector');
  // // удаляем кнопку перехода в полноэкранный режим
  // myMap.controls.remove('fullscreenControl');
  //  // удаляем контрол зуммирования
  //  myMap.controls.remove('zoomControl');
  //  // удаляем контрол правил
  // myMap.controls.remove('rulerControl');
  // // отключаем скролл карты (опционально)
  // myMap.behaviors.disable(['scrollZoom']);


  if (addressSearchBtn) {
    addressSearchBtn.addEventListener('click', onGetAddress)
  }

}

/* Dadata - jquery плагин*/
// API-ключ
const token = "589b8e7dc737a4e8fc700bba004fb2a537b21120";


$(document).ready(function () {

  /* Адрес */
  $("[data-address-field]").suggestions({
    token: token,
    type: "ADDRESS",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
      console.log(suggestion);
    }
  });

  /* Имя */
  $("[data-name]").suggestions({
    token: token,
    type: "NAME",
    params: {
      parts: ["NAME"]
    },
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
      console.log(suggestion);
    }
  });

  /* Фамилия */
  $("[data-surname]").suggestions({
    token: token,
    type: "NAME",
    params: {
      parts: ["SURNAME"]
    },
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
      console.log(suggestion);
    }
  });

  /* Почта */
  $("[data-mail]").suggestions({
    token: token,
    type: "EMAIL",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
      console.log(suggestion);
    }
  });

  /* Подписка на рассылку */
  $("[data-subscription-field]").suggestions({
    token: token,
    type: "EMAIL",
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: function (suggestion) {
      console.log(suggestion);
    }
  });
})

/* Удаление/Восстановление товара */

// Копирование шаблона - восстановление товара
const recoveryTemplate = document.querySelector('#recovery-item')
  .content
  .querySelector('[data-product-recovery]');


/* В принципе можно к счетчику прикрепиться, чтобы второй обработчик ни вешать на форму, но не стал смешивать */
const onRemoveItem = (evt) => {
  // Удаление товара
  if (evt.target.matches('[data-delete-product]')) {
    // Секция для вставки
    const productWrapper = evt.target.closest('[data-product-wrapper]');
    // Сам товар
    const product = productWrapper.querySelector('[data-product]');
    // Название товара
    const productTitle = product.querySelector('[data-product-title]').textContent;

    // Скрываем эл-т
    product.style.display = 'none';

    const recoveryBlock = recoveryTemplate.cloneNode(true);
    recoveryBlock.querySelector('[data-product-recovery-title]').textContent = productTitle;

    // Вставляем после удаленного продукта
    productWrapper.append(recoveryBlock);

    // Т.к. в разметке товар не удаляется до конца, то подсчет не получится
    // calculateTotalQuantity();
  }

  // Полное удаление товара
  if (evt.target.matches('[data-complete-remove-product]')) {
    // Секция для вставки
    const productWrapper = evt.target.closest('[data-product-wrapper]');
    productWrapper.remove();
    //Блок с приблизительной стоимостью - Подсчет общего кол-ва товара
    checkProductsQuantity();
    // Иконка над корзиной - Подсчет общего кол-ва
    calculateTotalQuantity();
  }

  // Восстановление
  if (evt.target.matches('[data-recovery-item]')) {
    // Секция для вставки
    const productWrapper = evt.target.closest('[data-product-wrapper]');
    // Сам товар
    const product = productWrapper.querySelector('[data-product]');
    // Блок - восстановление товара
    const recoveryBlock = productWrapper.querySelector('[data-product-recovery]');

    recoveryBlock.remove();
    product.style.display = 'grid';
  }
}

if (makingOrderForm) {
  makingOrderForm.addEventListener('click', onRemoveItem);
}


/* Autoresize textarea для ввода адреса  */

// Все поля которым нужен Autoresize
const textareaField = document.querySelectorAll('[data-autoresize]');

if (textareaField) {
  textareaField.forEach((field) => {
    // Высота по умолчанию, которую мы задали
    let textareaFieldHeight = field.offsetHeight;

    /**
     * Autoresize textarea
     */
    const onAutoResize = (evt) => {
      const textareaField = evt.target;

      textareaField.style.height = `${textareaFieldHeight}px`;
      textareaField.style.height = `${textareaField.scrollHeight}px`;
    }

    field.addEventListener('input', onAutoResize);
  })
}


/* Поиск по сайту в десктопе */
// - Автофокус на инпуте пропадает - похоже из-за св-ва visibility. Можно через display попробовать

const siteSearchBtn = document.querySelector('[data-site-search]');
// const siteSearchModal = document.querySelector('[data-site-search-modal]');

/**
 * Закрытие по нажатию на Escape
 */
const onEscPress = (evt) => {
  if (isEscKey(evt)) {
    const headerSite = document.querySelector('[data-header]');
    const siteSearchModal = headerSite.querySelector('[data-site-search-modal]');
    const searchModalClose = siteSearchModal.querySelector('[data-search-modal-close]');

    headerSite.classList.remove('site-search-open');
    siteSearchModal.style.visibility = 'hidden';
    siteSearchModal.style.maxHeight = 0;

    document.removeEventListener('keydown', onEscPress);
    searchModalClose.removeEventListener('click', onSearchCloseBtn);
  }
}

/**
 * Закрытие по клику на крестик
 */
const onSearchCloseBtn = () => {
  const headerSite = document.querySelector('[data-header]');
  const siteSearchModal = headerSite.querySelector('[data-site-search-modal]');
  const searchModalClose = siteSearchModal.querySelector('[data-search-modal-close]');

  headerSite.classList.remove('site-search-open');
  siteSearchModal.style.visibility = 'hidden';
  siteSearchModal.style.maxHeight = 0;

  searchModalClose.removeEventListener('click', onSearchCloseBtn);
}

/**
 * Закрытие по клику вне области модалки
 */
const onOutSearchModalClick = (evt) => {
  const headerSite = document.querySelector('[data-header]');
  const siteSearchModal = headerSite.querySelector('[data-site-search-modal]');

  if (!evt.composedPath().includes(siteSearchModal)) {
    headerSite.classList.remove('site-search-open');
    siteSearchModal.style.maxHeight = 0;
    siteSearchModal.style.visibility = 'hidden';
  }
}

/**
 * Открытие по клику на иконку
 */
const onOpenSearchModal = (evt) => {
  evt.stopPropagation();
  const headerSite = document.querySelector('[data-header]');
  const siteSearchModal = headerSite.querySelector('[data-site-search-modal]');
  const searchModalClose = siteSearchModal.querySelector('[data-search-modal-close]');
  const searchField = siteSearchModal.querySelector('[data-search-field]');

  headerSite.classList.toggle('site-search-open');

  if (headerSite.classList.contains('site-search-open')) {
    /* Доступность с клавиатуры - вкл */
    siteSearchModal.style.visibility = 'visible';

    siteSearchModal.style.maxHeight = siteSearchModal.scrollHeight + 'px';

    searchField.focus();

    document.addEventListener('keydown', onEscPress);
    searchModalClose.addEventListener('click', onSearchCloseBtn);
    document.addEventListener('click', onOutSearchModalClick);

  } else {
    /* Доступность с клавиатуры - выкл */
    // Psss...У hh.ru такого нет ;)
    // Но не работает автофокус!? Первый раз работает, потом - нет :(
    siteSearchModal.style.visibility = 'hidden';

    siteSearchModal.style.maxHeight = 0;

    document.removeEventListener('keydown', onEscPress);
    searchModalClose.removeEventListener('click', onSearchCloseBtn);
  }

}

if (window.matchMedia('(min-width: 1200px)').matches) {
  if (siteSearchBtn) {
    siteSearchBtn.addEventListener('click', onOpenSearchModal);
  }
}



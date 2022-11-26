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


// ==============
/* Подключение карты на сайт и поиск адреса введенного пользователем */

const map = document.querySelector('[data-map]');

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
  // Создание карты.
  const myMap = new ymaps.Map(map, {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.76, 37.64],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 7
  });

  function onGetAddress(evt) {
    const addressBlock = evt.target.closest('[data-address-block]');
    const addressField = addressBlock.querySelector('[data-address-field]').value;

    // Поиск координат центра Нижнего Новгорода.
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
      console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
      /**
       * Метаданные запроса и ответа геокодера.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderResponseMetaData.xml
       */
      console.log('Метаданные ответа геокодера: ', res.metaData);
      /**
       * Метаданные геокодера, возвращаемые для найденного объекта.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/GeocoderMetaData.xml
       */
      console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
      /**
       * Точность ответа (precision) возвращается только для домов.
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/precision.xml
       */
      console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
      /**
       * Тип найденного объекта (kind).
       * @see https://api.yandex.ru/maps/doc/geocoder/desc/reference/kind.xml
       */
      console.log('Тип геообъекта: %s', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.kind'));
      console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
      console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
      console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
      /**
      * Прямые методы для работы с результатами геокодирования.
      * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
      */
      console.log('\nГосударство: %s', firstGeoObject.getCountry());
      console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
      console.log('Адрес объекта: %s', firstGeoObject.getAddressLine());
      console.log('Наименование здания: %s', firstGeoObject.getPremise() || '-');
      console.log('Номер здания: %s', firstGeoObject.getPremiseNumber() || '-');

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


  if (addressSearchBtn) {
    addressSearchBtn.addEventListener('click', onGetAddress)
  }

}


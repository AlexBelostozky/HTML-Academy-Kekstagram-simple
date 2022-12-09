import {bodyElement} from './constants.js';

// Переменная для хранения состояния окна сообщения
let isMessageShown = false;

//=================================
// Вывод сообщения в отдельном окне

// Функция-обработчик нажатия Escape при открытом сообщении
function onMessageEscKeydown (evt) {
  if (isEscKeyPressed(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

// Функция-обработчик клика вне сообщения при открытом сообщении
function outsideMessageClick (evt) {
  const messageInnerElement = document.querySelector('div.message__inner');
  if (!messageInnerElement.contains(evt.target)) {
    closeMessage();
  }
}

// Функция-обработчик клика на кнопке сообщения
function onMessageButtonClick () {
  closeMessage();
}

// Функция закрытия сообщения
function closeMessage () {
  const messageSectionElement = document.querySelector('section.message');
  bodyElement.removeChild(messageSectionElement);
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', outsideMessageClick);
  isMessageShown = false;
}

// Функция отображения сообщения
function showMessage (messageType, messageInfo, messageText, messageButtonText) {

  // Переменная для шаблона сообщения
  const messageTemplateElement =
  (messageType === 'success') ?
  // Выбираем шаблон для вывода сообщения об успехе
    document.querySelector('#success').content.querySelector('.success') :
  // Выбираем шаблон для вывода сообщения об ошибке
    document.querySelector('#error').content.querySelector('.error');

  // Создаём заготовку-контейнер списка фотографии
  const messageBlankElement = document.createDocumentFragment();

  const newMessage = messageTemplateElement.cloneNode(true);

  // Проверяем наличие модифицирующих аргументов
  if (typeof messageInfo !== 'undefined' || typeof messageText !== 'undefined') {
    newMessage.querySelector('.message__title').textContent = '';
    // Редактируем текст сообщения
    if (typeof messageInfo !== 'undefined') {
      newMessage.querySelector('.message__title').textContent += `${messageInfo}. `;
    }

    if (typeof messageText !== 'undefined') {
      newMessage.querySelector('.message__title').textContent += `${messageText}`;
    }
  }

  // Проверяем наличие аргумента, модифицирующего текст кнопки
  if (typeof messageButtonText !== 'undefined') {
    newMessage.querySelector('.message__button').textContent = messageButtonText;
  }

  newMessage.querySelector('.message__button').addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', outsideMessageClick);
  messageBlankElement.append(newMessage);
  isMessageShown = true;

  return bodyElement.appendChild(messageBlankElement);
}

//=========

// Функция для проверки нажания кнопки Escape
function isEscKeyPressed (evt) {
  return evt.key === 'Escape';
}

export {isEscKeyPressed};
export {showMessage};
export {isMessageShown};

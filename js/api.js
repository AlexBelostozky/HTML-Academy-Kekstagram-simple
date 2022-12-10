import {showMessage} from './utils.js';
import {DATA_URL} from './constants.js';
import {DESTINATION_URL} from './constants.js';

// Функция для получения фотографий пользователей с сервера
function getData (onSuccess) {
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((usersPostsData) => onSuccess(usersPostsData))
    .catch((err) => showMessage('error', err, 'Невозможно загрузить фотографии других пользователей', 'Закрыть'));
}

// Функция для отправки фотографии
function sendData (onSuccess, onFail, unexpectedFail, data) {
  fetch(
    DESTINATION_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((err) => {
      unexpectedFail(err);
    });
}

export {getData};
export {sendData};

import {isEscKeyPressed} from './utils.js';
import {isMessageShown} from './utils.js';
import {showMessage} from './utils.js';
import {sendData} from './api.js';
import {MIN_SCALE} from './constants.js';
import {DEFAULT_SCALE} from './constants.js';
import {MAX_SCALE} from './constants.js';
import {SCALE_STEP} from './constants.js';
import {uploadFieldElement} from './constants.js';
import {photoUploadFormElement} from './constants.js';
import {formSubmitButtonElement} from './constants.js';
import {commentFieldElement} from './constants.js';
import {photoEditorFormElement} from './constants.js';
import {bodyElement} from './constants.js';
import {photoEditorFormCloseButtonElement} from './constants.js';
import {scaleControlFieldElement} from './constants.js';
import {scaleValueElement} from './constants.js';
import {imgPreviewElement} from './constants.js';
import {effectsListElement} from './constants.js';


function initUpload () {
  // Функция-обработчик нажатия Escape при открытой форме
  function onFormEscKeydown (evt) {
    if (isEscKeyPressed(evt) && !isMessageShown) {
      evt.preventDefault();
      closePhotoEditorForm();
    }
  }

  // Функция-обработчик нажатия кнопки закрытия формы
  function onFormCloseButtonClick () {
    closePhotoEditorForm();
  }

  // Функция-обработчик нажатия кнопки отправки формы
  function onUploadFormSubmit (evt) {
    submitUpload(evt);
  }

  // Функция закрытия формы редактирования фотографии
  function closePhotoEditorForm () {
    uploadFieldElement.value = '';
    commentFieldElement.value = '';
    imgPreviewElement.className = 'effects__preview--none';
    photoEditorFormElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    photoEditorFormCloseButtonElement.removeEventListener('click', onFormCloseButtonClick);
    document.removeEventListener('keydown', onFormEscKeydown);
    photoUploadFormElement.removeEventListener('submit', onUploadFormSubmit);
    scaleControlFieldElement.removeEventListener('click', onScaleControlClick);
    effectsListElement.removeEventListener('change', onEffectsListClick);
  }

  // Функция открытия формы редактирования фотографии
  function openPhotoEditorForm () {
    imgPreviewElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
    updateImageScaleValue();
    photoEditorFormElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    effectsListElement.querySelector('#effect-none').checked = true;

    // Установка обработчика события закрытия формы редактирования фотографии
    photoEditorFormCloseButtonElement.addEventListener('click', onFormCloseButtonClick);
    document.addEventListener('keydown', onFormEscKeydown);

    // Установка обработчика события изменения масштаба фотографии
    scaleControlFieldElement.addEventListener('click', onScaleControlClick);

    // Установка обработчика события изменения эффекта фотографии
    effectsListElement.addEventListener('change', onEffectsListClick);

    // Установка обработчика события отправки формы
    photoUploadFormElement.addEventListener('submit', onUploadFormSubmit);
  }

  // Функция блокировки кнопки отправки формы
  function blockSubmitButton () {
    formSubmitButtonElement.disabled = true;
    formSubmitButtonElement.textContent = 'Публикую...';
  }

  // Функция разблокировки кнопки отправки формы
  function unblockSubmitButton () {
    formSubmitButtonElement.disabled = false;
    formSubmitButtonElement.textContent = 'Опубликовать';
  }

  // Функция для отправки формы
  function submitUpload (evt) {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        showMessage('success');
        closePhotoEditorForm();
        unblockSubmitButton();
      },
      () => {
        showMessage('error');
        unblockSubmitButton();
      },
      (err) => {
        showMessage('error', err, 'Не удалось отправить фотографию. Попробуйте ещё раз 🙏');
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  }

  // Функция для определения масштаба изображения
  function getCurrentImageScale () {
    return 100 * imgPreviewElement.style.transform.replace(/[^0-9.,]+/g, '');
  }

  // Функция для изменения масштаба изображения
  function changeScale(scaleAction) {
    const currentImageScale = getCurrentImageScale();
    switch (scaleAction) {
      case 'reduce':
        if (currentImageScale > MIN_SCALE) {
          imgPreviewElement.style.transform = `scale(${(currentImageScale - SCALE_STEP) / 100})`;
        }
        break;
      case 'enlarge':
        if (currentImageScale < MAX_SCALE) {
          imgPreviewElement.style.transform = `scale(${(currentImageScale + SCALE_STEP) / 100})`;
        }
        break;
    }
  }

  // Функция для обновления поля масштаба изображения
  function updateImageScaleValue () {
    const currentImageScale = getCurrentImageScale();
    scaleValueElement.value = `${currentImageScale}%`;
  }

  // Функция-обработчик нажатия кнопок изменения масштаба изображения
  function onScaleControlClick (evt) {
    switch (evt.target.dataset.scaleControl) {
      case 'smaller':
        changeScale('reduce');
        break;
      case 'bigger':
        changeScale('enlarge');
        break;
    }
    updateImageScaleValue();
  }

  // Функция-обобработчик изменения эффекта изображения
  function onEffectsListClick (evt) {
    switch (evt.target.id) {
      case 'effect-none':
        imgPreviewElement.className = 'effects__preview--none';
        break;
      case 'effect-chrome':
        imgPreviewElement.className = 'effects__preview--chrome';
        break;
      case 'effect-sepia':
        imgPreviewElement.className = 'effects__preview--sepia';
        break;
      case 'effect-marvin':
        imgPreviewElement.className = 'effects__preview--marvin';
        break;
      case 'effect-phobos':
        imgPreviewElement.className = 'effects__preview--phobos';
        break;
      case 'effect-heat':
        imgPreviewElement.className = 'effects__preview--heat';
        break;
    }
  }

  // Функция-обработчик изменения формы загрузки фотографии
  function onPhotoEditorFormChange () {
    openPhotoEditorForm();
  }

  // Установка обработчика события загрузки фотографии
  uploadFieldElement.addEventListener('change', onPhotoEditorFormChange);
}

export {initUpload};

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

  // Функция для уменьшения масштаба изображения
  function reduceImage () {
    const currentImageScale = getCurrentImageScale();
    if (currentImageScale > MIN_SCALE) {
      imgPreviewElement.style.transform = `scale(${(currentImageScale - SCALE_STEP) / 100})`;
    }
  }

  // Функция для увеличения масштаба изображения
  function enlargeImage () {
    const currentImageScale = getCurrentImageScale();
    if (currentImageScale < MAX_SCALE) {
      imgPreviewElement.style.transform = `scale(${(currentImageScale + SCALE_STEP) / 100})`;
    }
  }

  // Функция для обновления поля масштаба изображения
  function updateImageScaleValue () {
    const currentImageScale = getCurrentImageScale();
    scaleValueElement.value = `${currentImageScale}%`;
  }

  // Функция-обработчик изменения масштаба изображения
  function onScaleControlClick (evt) {
    if (evt.target.matches('.scale__control--smaller')) {
      reduceImage();
    }
    if (evt.target.matches('.scale__control--bigger')) {
      enlargeImage();
    }
    updateImageScaleValue();
  }

  // Функция-обобработчик изменения эффекта изображения
  function onEffectsListClick (evt) {
    if (evt.target.matches('#effect-none')) {
      imgPreviewElement.className = 'effects__preview--none';
    }
    if (evt.target.matches('#effect-chrome')) {
      imgPreviewElement.className = 'effects__preview--chrome';
    }
    if (evt.target.matches('#effect-sepia')) {
      imgPreviewElement.className = 'effects__preview--sepia';
    }
    if (evt.target.matches('#effect-marvin')) {
      imgPreviewElement.className = 'effects__preview--marvin';
    }
    if (evt.target.matches('#effect-phobos')) {
      imgPreviewElement.className = 'effects__preview--phobos';
    }
    if (evt.target.matches('#effect-heat')) {
      imgPreviewElement.className = 'effects__preview--heat';
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

const MIN_SCALE = 25; /* Минимальный масштаб фотографии */
const DEFAULT_SCALE = 100; /* Масштаб фотографии по умолчанию */
const MAX_SCALE = 100; /* Максимальный масштаб фотографии */
const SCALE_STEP = 25; /* Шаг для изменения масштаба фотографии */

// Источник данных для загрузки
const DATA_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
// Адрес для отправки данных
const DESTINATION_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

const uploadFieldElement = document.querySelector('#upload-file');
const photoUploadFormElement = document.querySelector('.img-upload__form');
const formSubmitButtonElement = document.querySelector('#upload-submit');
const commentFieldElement = photoUploadFormElement.querySelector('.text__description');
const photoEditorFormElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const photoEditorFormCloseButtonElement = document.querySelector('#upload-cancel');
const scaleControlFieldElement = document.querySelector('.img-upload__scale');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const picturesContainerElement = document.querySelector('.pictures');
const picturesTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

export {MIN_SCALE};
export {DEFAULT_SCALE};
export {MAX_SCALE};
export {SCALE_STEP};
export {DATA_URL};
export {DESTINATION_URL};
export {uploadFieldElement};
export {photoUploadFormElement};
export {formSubmitButtonElement};
export {commentFieldElement};
export {photoEditorFormElement};
export {bodyElement};
export {photoEditorFormCloseButtonElement};
export {scaleControlFieldElement};
export {scaleValueElement};
export {imgPreviewElement};
export {effectsListElement};
export {picturesContainerElement};
export {picturesTemplateElement};

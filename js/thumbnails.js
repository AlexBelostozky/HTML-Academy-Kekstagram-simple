import {picturesContainerElement} from './constants.js'; // Переменная, содержащая элемент для размещения фотографий
import {picturesTemplateElement} from './constants.js'; // Переменная, содержащая шаблон для фотогоафий


// Функция для наполнения заготовки данными
function renderTumbnails (picturesData) {
  // Создаём заготовку-контейнер списка фотографии
  const picturesBlankElement = document.createDocumentFragment();

  picturesData.forEach(({url, likes, comments}) => {
    const newTumbnail = picturesTemplateElement.cloneNode(true);
    newTumbnail.querySelector('.picture__img').src = url;
    newTumbnail.querySelector('.picture__likes').textContent = likes;
    newTumbnail.querySelector('.picture__comments').textContent = comments;

    picturesBlankElement.append(newTumbnail);
  });
  // И только в конце отрисовываем всё из заготовки-контейнера
  return picturesContainerElement.appendChild(picturesBlankElement);
}

export {renderTumbnails};

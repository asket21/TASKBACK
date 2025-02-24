import { getData } from "./api-utils.js";
import { renderUsersList,renderObjectList } from "./dom-creators.js";
import { addUserFormListeners,addDeleteUsersListeners,addPasswordFormListeners,addObjectFormListeners,addAboutObjectListeners } from "./requests.js";
import { addUsersEditModeListeners } from "./user-edit-mode.js";
import {showTooltip} from "./dom-creators.js"

export async function reload(blockName) {
  switch (blockName) {

    case "users":
      loadUsersBlock();
      break;

    default:
      console.log("Unknown block name");
      break;
  }
}

export let usersState = [];
export let objectsState = [];

document.querySelectorAll('.section-title').forEach(title => {
  title.addEventListener('click', (e) => {
    // Игнорируем клики по кнопкам и их дочерним элементам
    if(e.target.closest('button')) return;
    
    const section = title.closest('section');
    const content = title.nextElementSibling;
    const arrow = title.querySelector('.arrow-icon');
    const isExpanded = content.classList.toggle('expanded');
    const storageKey = `section-${title.dataset.section}`;

    // Анимация стрелки
    arrow.style.transform = isExpanded ? 'rotate(0)' : 'rotate(-90deg)';
    
    // Сохраняем состояние
    localStorage.setItem(storageKey, isExpanded);
    title.setAttribute('aria-expanded', isExpanded);
    
    // Плавная прокрутка при открытии
    if(isExpanded && !title.dataset.initialized) {
      section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      title.dataset.initialized = true;
    }
  });
});


const userSearchInput = document.querySelector('.user-search');
let userSearchTimeout;

userSearchInput.addEventListener('input', (e) => {
  clearTimeout(userSearchInput);
  userSearchTimeout = setTimeout(() => {
    loadUsersBlock(e.target.value);
  }, 300);
});

const objectSearchInput = document.querySelector('.object-search');
let objectSearchTimeout;

objectSearchInput.addEventListener('input', (e) => {
  clearTimeout(objectSearchInput);
  objectSearchTimeout = setTimeout(() => {
    loadObjectBlock(e.target.value);
  }, 300);
});

async function loadUsersBlock(searchQuery = '') {
  try {
    const url = `/api/users${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`;

    usersState = await getData(url);
    console.log()
    const usersList = document.querySelector(".users-list");
    usersList.innerHTML = "";

    if (usersState.length === 0) {
      usersList.textContent = "Пользователи не найдены";
      return
    }
    renderUsersList(usersState);
    addUsersEditModeListeners();
    await addUserFormListeners();
    await addDeleteUsersListeners();
    await addPasswordFormListeners()}
  catch (error){
    console.error('Ошибка:', error);
    showTooltip('Ошибка загрузки данных');
  }
}
async function loadObjectBlock(searchQuery = '') {
  try {
    const url = `/api/object${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`;

    objectsState = await getData(url);
    console.log(objectsState)
    const objectsList = document.querySelector(".objects-list");
    objectsList.innerHTML = "";

    if (objectsState.length === 0) {
      objectsList.textContent = "Объекты не найдены";
      return
    }
    renderObjectList(objectsState);
    // addObjectsEditModeListeners();
    await addObjectFormListeners();
    // await addDeleteObjectsListeners();
    // await addObjectFormListeners()
    await addAboutObjectListeners();
    }
  catch (error){
    console.error('Ошибка:', error);
    showTooltip('Ошибка загрузки данных');
  }
}
  

  (async function init() {
    await loadUsersBlock();
    await loadObjectBlock();
  })();




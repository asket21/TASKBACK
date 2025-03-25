import { postData, deleteData, putData, getData } from "./api-utils.js";
import { reload } from "./script.js";
import { closeDialog, openDialog } from "./dialogs.js";
import { showTooltip } from "./dom-creators.js";
import {
  userCurrentState,
  changeUserEditMode,
  fillUsersStateFromForm,
  addUsersEditModeListeners
} from "./user-edit-mode.js";

import { appendPasswordForm,appendAboutObject } from "./forms.js";

let currentUserId = null;
let currentObjectId = null
import {
  objectCurrentState,
  changeObjectEditMode,
  fillObjectsStateFromForm,
  // addObjectsEditModeListeners

} from "./object-edit-model.js"


const prepareFormData = (form) => {
  const data = new FormData(form);
  var object = {};
  data.forEach((value, key) => {
    if (!object[key]) {
      object[key] = value;
    } else {
      if (typeof object[key] === "string") {
        object[key] = [object[key]];
      }
      object[key].push(value);
    }
  });
  return object;
};
// Объекты

// Создание объекта
const postNewObject = async (form) => {
  const objectData = prepareFormData(form);
  try {
    const response = await postData("/api/object", objectData);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    showTooltip(error.message);
    return false;
  }
};

const addObjectFormListeners = async () => {
  const postButton = document.querySelector(".add-object-button");
  postButton.addEventListener("click", () => {
    const form = document.querySelector(".form-object");
    form.addEventListener("submit", handleAddUsersSubmit);
  });
};

const handleAddObjectsSubmit = async (event) => {
  event.preventDefault();
  const form = document.querySelector(".form-object");
  const res = await postNewObject(form);
  if (res) {
    closeDialog();
    reload("object");
  }
};

const removeObjectFormListeners = () => {
  const form = document.querySelector(".form-object");
  form && form.removeEventListener("submit", handleAddObjectsSubmit);
};
//Вызов информации о объекте
const getObjectByID = async (id) => {
  try {

    const response = await getData(`/api/object/${id}/`);
    return response;
  } catch (error) {
    showTooltip(error.message);
    return [];
  }
};


const getUserById = async (id) => {
  try {

    const response = await getData(`/api/user/${id}`);
    return response;
  } catch (error) {
    showTooltip(error.message);
    return [];
  }
};

const getPlatformById = async (id) => {
  try {

    const response = await getData(`/api/platform/${id}`);
    return response;
  } catch (error) {
    showTooltip(error.message);
    return [];
  }
};


const addAboutObjectListeners = async() => {
  // Делегирование событий для кнопок
  document.addEventListener("click", async (event) => {
    const btn = event.target.closest(".about_object-button");
    if (!btn) return;
    const currentObjectId = btn.dataset.id;
    const currentObject = await getObjectByID(currentObjectId)
    appendAboutObject(currentObject);

    openDialog();
    
  });
  const formContainer = document.querySelector(".form-container");
  formContainer.addEventListener("submit", handleAddObjectsSubmit);
};




// Получение информации
const getAllPlatform = async () => {
  try {
    const response = await getData(`/api/platform`);
    return response;
  } catch (error) {
    showTooltip(error.message);
  }
  
}

const getUserByRole = async (role) => {
  try {

    const response = await getData(`/api/users/by-role/${role}`);
    return response;
  } catch (error) {
    showTooltip(error.message);
    return [];
  }
};
// Пользователи
// Пользователи создание
const postNewUser = async (form) => {
  const userData = prepareFormData(form);
  try {
    const response = await postData("/api/user", userData);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    showTooltip(error.message);
    return false;
  }
};
const addUserFormListeners = async () => {
  const postButton = document.querySelector(".add-user-button");
  postButton.addEventListener("click", () => {
    const form = document.querySelector(".form-user");
    form.addEventListener("submit", handleAddUsersSubmit);
  });
};

const handleAddUsersSubmit = async (event) => {
  event.preventDefault();
  const form = document.querySelector(".form-user");
  const res = await postNewUser(form);
  if (res) {
    closeDialog();
    reload("users");
  }
};

const removeUserFormListeners = () => {
  const form = document.querySelector(".form-user");
  form && form.removeEventListener("submit", handleAddUsersSubmit);
};

// Смена пароля

const addPasswordFormListeners = () => {
  // Делегирование событий для кнопок
  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".edit-password-button");
    if (!btn) return;

    currentUserId = btn.dataset.id;
    appendPasswordForm(currentUserId);
    openDialog();
  });
  const formContainer = document.querySelector(".form-container");
  formContainer.addEventListener("submit", handlePasswordUsersSubmit);
};

const handlePasswordUsersSubmit = async (event) => {
  event.preventDefault();
  const form = event.target.closest("form");

  try {
    const res = await putNewPassword(form, currentUserId);
    if (res) {
      closeDialog();
      reload("users");
    }
  } catch (error) {
    showTooltip(error.message);
  }
};

const removePasswordFormListeners = () => {
  const form = document.querySelector(".edit-password-form");
  if (form) {
    form.removeEventListener("submit", handlePasswordUsersSubmit);
  }
};

const putNewPassword = async (form, id) => {
  const passwordData = prepareFormData(form);

  try {
    const response = await putData(`/api/user/${id}/password`, passwordData);
    return response;
  } catch (error) {
    throw new Error(error.message || "Ошибка при изменении пароля");
  }
};

// Удаление пользователя
const deleteUsers = async (id) => {
  const response = await deleteData(`/api/user/${id}`);
  return response;
};

const addDeleteUsersListeners = async () => {
  const deleteButtons = document.querySelectorAll(".delete-user-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;

      const approved = confirm(
        "Вы уверены, что хотите удалить этого пользователя?"
      );
      if (approved) {
        const res = await deleteUsers(id);
        reload("users");
      }
    });
  });
};

// Редактирование пользователя

const putUser = async (id) => {
  try {
    const response = await putData(`/api/user/${id}`, userCurrentState);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    showTooltip(error.message);
    return false;
  }
};
const addPutUserListeners = async () => {
  const putButtons = document.querySelectorAll(".edit-user-button");
  putButtons.forEach((button) => {
    button.addEventListener("click", sendUserUpdateAndTurnOffEditMode);
  });
};

const removePutUserListeners = () => {
  const putButtons = document.querySelectorAll(".edit-user-button");
  putButtons.forEach((button) => {
    button.removeEventListener("click", sendUserUpdateAndTurnOffEditMode);
  });
};


const sendUserUpdateAndTurnOffEditMode = async (event) => {
  event.preventDefault();
  
  const id = event.currentTarget.dataset.id;
  fillUsersStateFromForm(id);
  const res = await putUser(id);
  if (res) {
    reload("users");
    removePutUserListeners();
    addUsersEditModeListeners();
    changeUserEditMode(id, false);
  }
};
// Редактирование объекта 

const putObject = async (id) => {
  try {
    const response = await putData(`/api/object/${id}`, objectCurrentState);
    if (response instanceof Error) {
      throw new Error(response.message);
    }
    return response;
  } catch (error) {
    showTooltip(error.message);
    return false;
  }
};


const addPutObjectListeners = async () => {
  const putButtons = document.querySelectorAll(".edit-about-object-button");
  putButtons.forEach((button) => {
    button.addEventListener("click", sendObjectUpdateAndTurnOffEditMode);
  });
};

const removePutObjectListeners = () => {
  const putButtons = document.querySelectorAll(".edit-about-object-button");
  putButtons.forEach((button) => {
    button.removeEventListener("click", sendObjectUpdateAndTurnOffEditMode);
  });
};

const sendObjectUpdateAndTurnOffEditMode = async (event) => {
  event.preventDefault();
  
  const id = event.currentTarget.dataset.id;
  fillObjectsStateFromForm(id);//+
  const res = await putObject(id);
  if (res) {
    reload("object");//+
    changeObjectEditMode(id, false);
    closeDialog()
  }
};



// Задачи 



const addTaskFormListeners = async () => {
  const postButton = document.querySelector(".add-task-button");
  postButton.addEventListener("click", () => {
    const form = document.querySelector(".form-task");
    form.addEventListener("submit", handleAddUsersSubmit);
  });
};




const removeTaskFormListeners = () => {
  const form = document.querySelector(".add-task-form");
  if (form) {
    form.removeEventListener("submit", handlePasswordUsersSubmit);
  }
};


export {
  addUserFormListeners,
  addPasswordFormListeners,
  addDeleteUsersListeners,
  removeUserFormListeners,
  addPutObjectListeners,
  addPutUserListeners,
  addObjectFormListeners,
  addAboutObjectListeners,
  removeObjectFormListeners,
  removePutUserListeners,
  removePutObjectListeners,
  removePasswordFormListeners,
  currentUserId,
  currentObjectId,
  getUserByRole,
  getAllPlatform,
  getObjectByID,
  getUserById,
  getPlatformById,
  removeTaskFormListeners,
  addTaskFormListeners
};

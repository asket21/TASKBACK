import { addPutUserListeners, removePutUserListeners } from "./requests.js";

export const userCurrentState = {
  name: "",
  login: "",
  role: "",
};



export let usersEditModeOn = false;

const useUserState = () => {
  function setCurrentUserState(key, value) {
    userCurrentState[key] = value;
  }
  function setUsersEditModeOn(state) {
    usersEditModeOn = state;
  }
  return { setCurrentUserState, setUsersEditModeOn };
};

const useEditableUserElementsState = (userId) => {
  const roleSelect = document.querySelector(`#user-role-${userId}`);
  if (roleSelect) {
    roleSelect.disabled = true;
  }
  const targetElementsState = [
    {
      name: "name",
      element: document.querySelector(`#user-${userId} .name`),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
    {
      name: "login",
      element: document.querySelector(`#user-${userId} .login`),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
    {
      name: "role",
      element: roleSelect,
      canEditText: false,
      canSetTransparency: true,
      canSetVisibility: false,
      value: roleSelect ? roleSelect.value : "", // Текущее значениe
      disabled: true, // Доступность
    },
  ];

  return targetElementsState;
};

const fillUsersStateFromPage = (userId) => {
  const targetElementsState = useEditableUserElementsState(userId);
  const { setCurrentUserState } = useUserState();
  setCurrentUserState(
    "name",
    targetElementsState.find((item) => item.name === "name").element.textContent
  );
  setCurrentUserState(
    "login",
    targetElementsState.find((item) => item.name === "login").element
      .textContent
  );

  const roleElement = targetElementsState.find(item => item.name === "role").element;
  setCurrentUserState("role", roleElement.value);
  }


export const fillUsersStateFromForm = (userId) => {
  const targetElementsState = useEditableUserElementsState(userId);
  const { setCurrentUserState } = useUserState();
  setCurrentUserState(
    "name",
    targetElementsState.find((item) => item.name === "name").element.textContent
  );
  setCurrentUserState(
    "login",
    targetElementsState.find((item) => item.name === "login").element
      .textContent
  );
  const roleElement = targetElementsState.find(item => item.name === "role").element;
  setCurrentUserState("role", roleElement.value);
};

const changeTargetElementsStyle = (userId, targetElementsState, state) => {
  if (state) {  // Редактирование
    targetElementsState.forEach((element) => {
      if (element.name === "role") {
        // Для select управляем состоянием через disabled
        element.element.disabled = false ; 
        element.element.style.opacity = element.canSetTransparency ? "1" : "1";
      } else {
        element.element.contentEditable = element.canEditText;
        element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
      }
    });
    targetElementsState.find((item) => item.name === "name").element.focus();
    const usersCards = [...document.querySelectorAll(".user-list-item")];
    // const selectStatus = document.querySelector(`user-role-${userId}`);
    // console.log(selectStatus)

    usersCards.forEach((card) => {
      if (card.id !== `user-${userId}`) {
        card.style.filter = "blur(10px)";
        card.style.pointerEvents = "none";
      } else {
        card.style.transform = "scale(1.1)";
        card.style.boxShadow = "0 0 0 10px #333";
        card.style.backgroundColor = "white";
        card.style.zIndex = "1";
        card.style.position = "relative";
        card.style.padding = "2em";
      }
    });
  } else {// Сохранение 
    const selectStatus = document.querySelector(`#user-role-${userId}`);
    selectStatus.disabled = true; 
    targetElementsState.forEach((element) => {
      element.element.contentEditable = !element.canEditText;
      element.element.style.opacity = !element.canSetTransparency ? ".5" : "1";
    });
    const usersCards = [...document.querySelectorAll(".user-list-item")];
    usersCards.forEach((card) => {
      card.style.filter = "none";
      card.style.pointerEvents = "auto";
      card.style.transform = "scale(1)";
      card.style.boxShadow = "none";
      card.style.backgroundColor = "transparent";
      card.style.zIndex = "0";
      card.style.position = "static";
      card.style.padding = "0";
    });
  }
};

const setButtonStyle = (userId, state) => {
  if (state) {
    document.querySelector(
      `#user-${userId} .edit-user-button .edit-button-text`
    ).textContent = "Сохранить";
  } else {
    document.querySelector(
      `#user-${userId} .edit-user-button .edit-button-text`
    ).textContent = "Редактировать";
  }
};

const setCloseButtonStyleAndListeners = (userId, state) => {
  if (state) {
    const handleCloseButtonClick = () => {
      changeUserEditMode(userId, false);
      document
        .querySelector(`#user-${userId} .close-item`)
        .removeEventListener("click", handleCloseButtonClick);
      removePutUserListeners();
      addUsersEditModeListeners();
      document
        .querySelector(`#user-${userId} .close-item`)
        .removeAttribute("style");
    };
    document.querySelector(`#user-${userId} .close-item`).style.display =
      "block";
    document
      .querySelector(`#user-${userId} .close-item`)
      .addEventListener("click", handleCloseButtonClick);
  }
};


export const changeUserEditMode = (userId, state) => {
  const targetElementsState = useEditableUserElementsState(userId);
  const { setUsersEditModeOn } = useUserState();
  if (state) {
    addSelectListeners(userId);
    changeTargetElementsStyle(userId, targetElementsState, true);
    setButtonStyle(userId, true);
    setCloseButtonStyleAndListeners(userId, true);
    setUsersEditModeOn(true);
  } else {
    changeTargetElementsStyle(userId, targetElementsState, false);
    setButtonStyle(userId, false);
    setCloseButtonStyleAndListeners(userId, false);
    setUsersEditModeOn(false);
  }
};


export const addSelectListeners = (userId) => {
  const select = document.querySelector(`#user-role-${userId}`);
  if (select) {
    select.addEventListener('change', (e) => {
      const { setCurrentUserState } = useUserState();
      setCurrentUserState("role", e.target.value);
    });
  }
};

const handleSelectChange = (userId, event) => {
  const { setCurrentUserState } = useUserState();
  setCurrentUserState("role", {
    value: event.target.value,
    options: Array.from(event.target.options).map(opt => ({
      value: opt.value,
      text: opt.textContent,
      selected: opt.selected
    })),
    disabled: false
  });

  const select = document.querySelector(`#user-role-${userId}`);
  if (select) {
    select.addEventListener('change', (e) => handleSelectChange(userId, e));
  }
};


const handleButtonClick = (event) => {
  const userId = event.currentTarget.dataset.id;
  fillUsersStateFromPage(userId);
  changeUserEditMode(userId, true);
  const userEditButton = document.querySelectorAll(".edit-user-button");
  userEditButton.forEach((button) => {
    button.removeEventListener("click", handleButtonClick);
  });
  addPutUserListeners();
};

export const addUsersEditModeListeners = () => {  
  const userEditButton = document.querySelectorAll(".edit-user-button");
  userEditButton.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });
};

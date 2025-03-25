import { addPutObjectListeners, removePutObjectListeners } from "./requests.js";

export const objectCurrentState = {
  title: "",
  address: "",
  manager_id: "",
  telegram_object_chat_id: "",
  telegram_object_chat_link: "",
  platform: "",
};

export let objectsEditModeOn = false;

const useObjectState = () => {
  function setCurrentObjectState(key, value) {
    objectCurrentState[key] = value;
  }
  function setObjectsEditModeOn(state) {
    objectsEditModeOn = state;
  }
  return { setCurrentObjectState, setObjectsEditModeOn };
};

const useEditableObjectElementsState = (objectId) => {
 
  const managerSelect = document.querySelector(
    `#object-about-manager-id${objectId}`
  );
  
  if (managerSelect) {
    managerSelect.disabled = true;
  }
  const platformSelect = document.querySelector(
    `#object-about-choose-platform-id${objectId}`
  );
  if (platformSelect) {
    platformSelect.disabled = true;
  }
  const targetElementsState = [
    {
      name: "title",
      element: document.querySelector(`#object-${objectId} .title`),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
    {
      name: "address",
      element: document.querySelector(`#object-${objectId} .address`),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
    {
      name: "manager_id",
      element: managerSelect,
      canEditText: false,
      canSetTransparency: true,
      canSetVisibility: false,
      value: managerSelect ? managerSelect.value : "", // Текущее значениe
      disabled: true, // Доступность
    },
    {
      name: "platform",
      element: platformSelect,
      canEditText: false,
      canSetTransparency: true,
      canSetVisibility: false,
      value: platformSelect ? platformSelect.value : "", // Текущее значениe
      disabled: true, // Доступность
    },
    {
      name: "telegram_object_chat_id",
      element: document.querySelector(
        `#object-${objectId} .telegram_object_chat_id`
      ),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
    {
      name: "telegram_object_chat_link",
      element: document.querySelector(
        `#object-${objectId} .telegram_object_chat_link`
      ),
      canEditText: true,
      canSetTransparency: true,
      canSetVisibility: false,
    },
  ];

  return targetElementsState;
};

const fillObjectsStateFromPage = (objectId) => {
  const targetElementsState = useEditableObjectElementsState(objectId);
  const { setCurrentObjectState } = useObjectState();
  setCurrentObjectState(
    "title",
    targetElementsState.find((item) => item.name === "title").element
      .textContent
  );
  setCurrentObjectState(
    "address",
    targetElementsState.find((item) => item.name === "address").element
      .textContent
  );
  setCurrentObjectState(
    "telegram_object_chat_id",
    targetElementsState.find((item) => item.name === "telegram_object_chat_id")
      .element.textContent
  );
  setCurrentObjectState(
    "telegram_object_chat_link",
    targetElementsState.find(
      (item) => item.name === "telegram_object_chat_link"
    ).element.textContent
  );

  const chooseManagerElement = targetElementsState.find(
    (item) => item.name === "manager_id"
  ).element;
  setCurrentObjectState("manager_id", chooseManagerElement.value);
  const choosePlatformElement = targetElementsState.find(
    (item) => item.name === "platform"
  ).element;
  setCurrentObjectState("platform", choosePlatformElement.value);
};

export const fillObjectsStateFromForm = (objectId) => {
  const targetElementsState = useEditableObjectElementsState(objectId);
  const { setCurrentObjectState } = useObjectState();
  setCurrentObjectState(
    "title",
    targetElementsState.find((item) => item.name === "title").element
      .textContent
  );
  setCurrentObjectState(
    "address",
    targetElementsState.find((item) => item.name === "address").element
      .textContent
  );
  setCurrentObjectState(
    "telegram_object_chat_id",
    targetElementsState.find((item) => item.name === "telegram_object_chat_id")
      .element.textContent
  );
  setCurrentObjectState(
    "telegram_object_chat_link",
    targetElementsState.find(
      (item) => item.name === "telegram_object_chat_link"
    ).element.textContent
  );

  const chooseManagerElement = targetElementsState.find(
    (item) => item.name === "manager_id"
  ).element;
  setCurrentObjectState("manager_id", chooseManagerElement.value);
  const choosePlatformElement = targetElementsState.find(
    (item) => item.name === "platform"
  ).element;
  setCurrentObjectState("platform", choosePlatformElement.value);
};

const changeObjectTargetElementsStyle = (objectId, targetElementsState, state) => {
  if (state) {
    // Редактирование
    targetElementsState.forEach((element) => {
      
      if (
        element.name === "manager_id" ||
        element.name === "platform"
      ) {
        // Для select управляем состоянием через disabled
        element.element.disabled = false;
        element.element.style.opacity = element.canSetTransparency ? "1" : "1";
      } else {
        element.element.contentEditable = element.canEditText;
        element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
      }
    });
    targetElementsState.find((item) => item.name === "title").element.focus();
    const objectsCard = document.querySelector(".objects-list-item");     
    
    if (objectsCard.id !== `object-${objectId}`) {
      // objectsCard.style.filter = "blur(10px)";
      objectsCard.style.pointerEvents = "none";
    } else {
      objectsCard.style.transform = "scale(1.1)";
      objectsCard.style.boxShadow = "0 0 0 10px #333";
      objectsCard.style.backgroundColor = "white";
      objectsCard.style.zIndex = "1";
      objectsCard.style.position = "relative";
      objectsCard.style.padding = "2em";
    }
  } else {
    // Сохранение
    targetElementsState.forEach((element) => {
      if (
        element.name === "manager_id" ||
        element.name === "platform"
      ) {
        // Для select управляем состоянием через disabled
        element.element.disabled = true;
        element.element.style.opacity = element.canSetTransparency ? "1" : "1";
      } else {
        element.element.contentEditable = element.canEditText;
        element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
      }
    });
    const objectsCard = document.querySelector(".objects-list-item");
    
    objectsCard.style.filter = "none";
    objectsCard.style.pointerEvents = "auto";
    objectsCard.style.transform = "scale(1)";
    objectsCard.style.boxShadow = "none";
    objectsCard.style.backgroundColor = "transparent";
    objectsCard.style.zIndex = "0";
    objectsCard.style.position = "static";
    objectsCard.style.padding = "0";
  }
};

const setButtonStyle = (objectId, state) => {
  if (state) {
    document.querySelector(
      `#object-${objectId} .edit-about-object-button .edit-about-button-text`
    ).textContent = "Сохранить";
  } else {
    document.querySelector(
      `#object-${objectId} .edit-about-object-button .edit-about-button-text`
    ).textContent = "Редактировать";
  }
};

const setCloseButtonStyleAndListeners = (objectId, state) => {
  if (state) {
    const handleCloseButtonClick = () => {
      changeObjectEditMode(objectId, false);
      document
        .querySelector(`#object-${objectId} .close-item`)
        .removeEventListener("click", handleCloseButtonClick);
      removePutObjectListeners();
      // addObjectsEditModeListeners();
      document
        .querySelector(`#object-${objectId} .close-item`)
        .removeAttribute("style");
    };
    document.querySelector(`#object-${objectId} .close-item`).style.display =
      "block";
    document
      .querySelector(`#object-${objectId} .close-item`)
      .addEventListener("click", handleCloseButtonClick);
  }
};

export const changeObjectEditMode = (objectId, state) => {
  const targetElementsState = useEditableObjectElementsState(objectId);
  const { setObjectsEditModeOn } = useObjectState();
  if (state) {
    addSelectPlatformListeners(objectId);
    changeObjectTargetElementsStyle(objectId, targetElementsState, true);
    setButtonStyle(objectId, true);
    setCloseButtonStyleAndListeners(objectId, true);
    setObjectsEditModeOn(true);
  } else {
    addSelectPlatformListeners(objectId)
    changeObjectTargetElementsStyle(objectId, targetElementsState, false);
    setButtonStyle(objectId, false);
    setCloseButtonStyleAndListeners(objectId, false);
    setObjectsEditModeOn(false);
  }
};

export const addSelectPlatformListeners = (objectId) => {
  const select = document.querySelector(
    `#object-about-manager-id${objectId}`
  );
  if (select) {
    select.addEventListener("change", (e) => {
      const { setCurrentObjectState } = useObjectState();
      setCurrentObjectState("platform", e.target.value);
    });
  }
};
export const addSelectManagerListeners = (objectId) => {
  const select = document.querySelector(
    `#object-about-manager-id${objectId}`
  );
  const secondSelect = document.querySelector(
    `object-about-choose-platform-id${objectId}`
  );
  if (select) {
    select.addEventListener("change", (e) => {
      const { setCurrentObjectState } = useObjectState();
      setCurrentObjectState("manager_id", e.target.value);
    });
  }
  if (secondSelect) {
    secondSelect.addEventListener("change", (e) => {
      const { setCurrentObjectState } = useObjectState();
      setCurrentObjectState("platform", e.target.value);
    });
  }
};

const handleObjectSelectChange = (userId, event) => {
  const { setCurrentObjectState } = useUserState();
  setCurrentObjectState("manager_id", {
    value: event.target.value,
    options: Array.from(event.target.options).map((opt) => ({
      value: opt.value,
      text: opt.textContent,
      selected: opt.selected,
    })),
    disabled: false,
  });
  setCurrentObjectState("plaform", {
    value: event.target.value,
    options: Array.from(event.target.options).map((opt) => ({
      value: opt.value,
      text: opt.textContent,
      selected: opt.selected,
    })),
    disabled: false,
  });
  const secondSelect = document.querySelector(
    `object-about-choose-platform-id${object.id}`
  );
  const select = document.querySelector(
    `#object-about-manager-id:${object.id}`
  );
  if (select) {
    select.addEventListener("change", (e) =>
      handleObjectSelectChange(userId, e)
    );
  }
  if (secondSelect) {
    secondSelect.addEventListener("change", (e) =>
      handleObjectSelectChange(userId, e)
    );
  }
};

const handleButtonClick = (event) => {
  const objectId = event.currentTarget.dataset.id;
  // console.log("Начало редактирования объекта ID:", objectId);
  fillObjectsStateFromPage(objectId);
  changeObjectEditMode(objectId,true)
  

  try {

    const editButtons = document.querySelectorAll(".edit-about-object-button");
    editButtons.forEach(button => {
      button.removeEventListener("click", handleButtonClick);
    });
    
    fillObjectsStateFromPage(objectId);
    changeObjectEditMode(objectId, true);
    addPutObjectListeners();
  } catch (error) {
    console.error("Ошибка при обработке клика:", error);
  }
};

export const addObjectsEditModeListeners = () => {
  const objectEditButtons = document.querySelectorAll(
    ".edit-about-object-button"
  );
  if (!objectEditButtons.length) {
    console.warn("Кнопки редактирования не найдены");
    return;
  }

  objectEditButtons.forEach((button) => {
    button.addEventListener("click",  handleButtonClick);
    console.log("Обработчик добавлен для:", button);
  });
};

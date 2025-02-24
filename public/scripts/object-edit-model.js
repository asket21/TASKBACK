// import { addPutObjectListeners, removePutObjectListeners } from "./requests.js";

// export const objectCurrentState = {
//   name: "",
//   login: "",
//   role: "",
// };



// export let objectsEditModeOn = false;

// const useObjectState = () => {
//   function setCurrentObjectState(key, value) {
//     objectCurrentState[key] = value;
//   }
//   function setObjectsEditModeOn(state) {
//     objectsEditModeOn = state;
//   }
//   return { setCurrentObjectState, setObjectsEditModeOn };
// };

// const useEditableObjectElementsState = (objectId) => {
//   const roleSelect = document.querySelector(`#object-role-${objectId}`);
//   if (roleSelect) {
//     roleSelect.disabled = true;
//   }
//   const targetElementsState = [
//     {
//       name: "name",
//       element: document.querySelector(`#object-${objectId} .name`),
//       canEditText: true,
//       canSetTransparency: true,
//       canSetVisibility: false,
//     },
//     {
//       name: "login",
//       element: document.querySelector(`#object-${objectId} .login`),
//       canEditText: true,
//       canSetTransparency: true,
//       canSetVisibility: false,
//     },
//     {
//       name: "role",
//       element: roleSelect,
//       canEditText: false,
//       canSetTransparency: true,
//       canSetVisibility: false,
//       value: roleSelect ? roleSelect.value : "", // Текущее значениe
//       disabled: true, // Доступность
//     },
//   ];

//   return targetElementsState;
// };

// export const fillObjectsStateFromPage = (objectId) => {
//   const targetElementsState = useEditableObjectElementsState(objectId);
//   const { setCurrentObjectState } = useObjectState();
//   setCurrentObjectState(
//     "name",
//     targetElementsState.find((item) => item.name === "name").element.textContent
//   );
//   setCurrentObjectState(
//     "login",
//     targetElementsState.find((item) => item.name === "login").element
//       .textContent
//   );

//   const roleElement = targetElementsState.find(item => item.name === "role").element;
//   setCurrentObjectState("role", roleElement.value);
//   }


// export const fillObjectsStateFromForm = (objectId) => {
//   const targetElementsState = useEditableObjectElementsState(objectId);
//   const { setCurrentObjectState } = useObjectState();
//   setCurrentObjectState(
//     "name",
//     targetElementsState.find((item) => item.name === "name").element.textContent
//   );
//   setCurrentObjectState(
//     "login",
//     targetElementsState.find((item) => item.name === "login").element
//       .textContent
//   );
//   const roleElement = targetElementsState.find(item => item.name === "role").element;
//   setCurrentObjectState("role", roleElement.value);
// };

// const changeTargetElementsStyle = (objectId, targetElementsState, state) => {
//   if (state) {  // Редактирование
//     targetElementsState.forEach((element) => {
//       if (element.name === "role") {
//         // Для select управляем состоянием через disabled
//         element.element.disabled = false ; 
//         element.element.style.opacity = element.canSetTransparency ? "1" : "1";
//       } else {
//         element.element.contentEditable = element.canEditText;
//         element.element.style.opacity = element.canSetTransparency ? ".5" : "1";
//       }
//     });
//     targetElementsState.find((item) => item.name === "name").element.focus();
//     const objectsCards = [...document.querySelectorAll(".object-list-item")];
//     // const selectStatus = document.querySelector(`object-role-${objectId}`);
//     // console.log(selectStatus)

//     objectsCards.forEach((card) => {
//       if (card.id !== `object-${objectId}`) {
//         card.style.filter = "blur(10px)";
//         card.style.pointerEvents = "none";
//       } else {
//         card.style.transform = "scale(1.1)";
//         card.style.boxShadow = "0 0 0 10px #333";
//         card.style.backgroundColor = "white";
//         card.style.zIndex = "1";
//         card.style.position = "relative";
//         card.style.padding = "2em";
//       }
//     });
//   } else {// Сохранение 
//     const selectStatus = document.querySelector(`#object-role-${objectId}`);
//     selectStatus.disabled = true; 
//     targetElementsState.forEach((element) => {
//       element.element.contentEditable = !element.canEditText;
//       element.element.style.opacity = !element.canSetTransparency ? ".5" : "1";
//     });
//     const objectsCards = [...document.querySelectorAll(".object-list-item")];
//     objectsCards.forEach((card) => {
//       card.style.filter = "none";
//       card.style.pointerEvents = "auto";
//       card.style.transform = "scale(1)";
//       card.style.boxShadow = "none";
//       card.style.backgroundColor = "transparent";
//       card.style.zIndex = "0";
//       card.style.position = "static";
//       card.style.padding = "0";
//     });
//   }
// };

// const setButtonStyle = (objectId, state) => {
//   if (state) {
//     document.querySelector(
//       `#object-${objectId} .edit-object-button .edit-button-text`
//     ).textContent = "Сохранить";
//   } else {
//     document.querySelector(
//       `#object-${objectId} .edit-object-button .edit-button-text`
//     ).textContent = "Редактировать";
//   }
// };

// const setCloseButtonStyleAndListeners = (objectId, state) => {
//   if (state) {
//     const handleCloseButtonClick = () => {
//       changeObjectEditMode(objectId, false);
//       document
//         .querySelector(`#object-${objectId} .close-item`)
//         .removeEventListener("click", handleCloseButtonClick);
//       removePutObjectListeners();
//       addObjectsEditModeListeners();
//       document
//         .querySelector(`#object-${objectId} .close-item`)
//         .removeAttribute("style");
//     };
//     document.querySelector(`#object-${objectId} .close-item`).style.display =
//       "block";
//     document
//       .querySelector(`#object-${objectId} .close-item`)
//       .addEventListener("click", handleCloseButtonClick);
//   }
// };

// export const changeObjectEditMode = (objectId, state) => {
//   const targetElementsState = useEditableObjectElementsState(objectId);
//   const { setObjectsEditModeOn } = useObjectState();
//   if (state) {
//     addSelectListeners(objectId);
//     changeTargetElementsStyle(objectId, targetElementsState, true);
//     setButtonStyle(objectId, true);
//     setCloseButtonStyleAndListeners(objectId, true);
//     setObjectsEditModeOn(true);
//   } else {
//     changeTargetElementsStyle(objectId, targetElementsState, false);
//     setButtonStyle(objectId, false);
//     setCloseButtonStyleAndListeners(objectId, false);
//     setObjectsEditModeOn(false);
//   }
// };


// export const addSelectListeners = (objectId) => {
//   const select = document.querySelector(`#object-role-${objectId}`);
//   if (select) {
//     // Удаляем предыдущий обработчик во избежание дублирования
//     // select.removeEventListener('change', handleSelectChange); 
//     select.addEventListener('change', (e) => {
//       const { setCurrentObjectState } = useObjectState();
//       setCurrentObjectState("role", e.target.value);
//     });
//   }
// };

// // const handleSelectChange = (objectId, event) => {
// //   const { setCurrentObjectState } = useObjectState();
// //   setCurrentObjectState("role", {
// //     value: event.target.value,
// //     options: Array.from(event.target.options).map(opt => ({
// //       value: opt.value,
// //       text: opt.textContent,
// //       selected: opt.selected
// //     })),
// //     disabled: false
// //   });

// //   const select = document.querySelector(`#object-role-${objectId}`);
// //   if (select) {
// //     select.addEventListener('change', (e) => handleSelectChange(objectId, e));
// //   }
// // };


// const handleButtonClick = (event) => {
//   const objectId = event.currentTarget.dataset.id;
//   fillObjectsStateFromPage(objectId);
//   changeObjectEditMode(objectId, true);
//   const objectEditButton = document.querySelectorAll(".edit-object-button");
//   objectEditButton.forEach((button) => {
//     button.removeEventListener("click", handleButtonClick);
//   });
//   addPutObjectListeners();
// };

// export const addObjectsEditModeListeners = () => {  
//   const objectEditButton = document.querySelectorAll(".edit-object-button");
//   objectEditButton.forEach((button) => {
//     button.addEventListener("click", handleButtonClick);
//   });
// };

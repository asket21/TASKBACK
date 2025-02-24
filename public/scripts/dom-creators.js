


const generateUserList = (usersArray, template, parent) => {
  if (usersArray.length <= 0) {
    parent.textContent = "Пока нет пользователей, добавь нового пользователя.";
    return;
  }
  usersArray.forEach((element) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("article").id = `user-${element.id}`;
    clone.querySelector("h3").textContent = element.name;
    clone.querySelector(".login").textContent = element.login;
    clone.querySelector("select").id = `user-role-${element.id}`;
    clone.querySelector("select").disabled = true;
    clone.querySelector(".role").textContent = element.role;
    clone.querySelector(".edit-user-button").dataset.id = element.id;
    clone.querySelector(".delete-user-button").dataset.id = element.id;
    clone.querySelector(".edit-password-button").dataset.id = element.id;
    parent.append(clone);
  });
};




const renderUsersList = (usersArray) => {
  const template = document.querySelector("#users-list-item");
  const parent = document.querySelector(".users-list");
  generateUserList(usersArray, template, parent);
};

const generateObjectList = (objectsArray, template, parent) => {
  if (objectsArray.length <= 0) {
    parent.textContent = "Пока нет пользователей, добавь нового пользователя.";
    return;
  }
  objectsArray.forEach((element) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("article").id = `object-${element.id}`;
    clone.querySelector("h3").textContent = element.title;  
    clone.querySelector(".about_object-button").dataset.id = element.id;
    parent.append(clone);
  });
};
  
const renderObjectList = (objectsArray) => {
  const template = document.querySelector("#objects-list-item");
  const parent = document.querySelector(".objects-list");
  generateObjectList(objectsArray, template, parent);
}

const hideTooltip = () => {
  document.querySelector(".tooltip").classList.remove("active");
  document.querySelector(".tooltip").textContent = "";
  document.querySelector(".tooltip").close();
};

const showTooltip = (text) => {
  document.querySelector(".tooltip").textContent = text;
  document.querySelector(".tooltip").showModal();
  document.querySelector(".tooltip").classList.add("active");
  setTimeout(hideTooltip, 1500);
};


export { renderUsersList, showTooltip, hideTooltip, renderObjectList}


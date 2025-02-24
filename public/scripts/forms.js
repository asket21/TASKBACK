import { getUserByRole,getAllPlatform } from "./requests.js";

const createUserForm = () => {
  const template = document.querySelector(".add-user-form");
  const clone = template.content.cloneNode(true);
  return clone;
};

const createPasswordForm = () => {
  const template = document.querySelector(".edit-password-form");
  const clone = template.content.cloneNode(true);
  return clone;
}; 
const appendPasswordForm = (userId) => {
  const parent = document.querySelector(".form-container");
  parent.innerHTML = "";
  const formClone = createPasswordForm();
  const form = formClone.querySelector("form");
  form.dataset.userId = userId; // Добавляем ID в форму
  parent.append(formClone);
};

const appendUserForm = () => {
  const userForm = createUserForm();
  const parent = document.querySelector(".form-container");
  parent.innerHTML = "";
  parent.append(userForm);
};


const createAboutObject = async (object) => {

  try {
    const template = document.querySelector(".object-about-item");
    const clone = template.content.cloneNode(true);
    const managers = await getUserByRole("manager");

    clone.querySelector("h3").textContent = object.title;

    const select = clone.querySelector('select[name="manager_id"]')
    select.innerHTML = ""
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Выберите менеджера";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    managers.forEach((manager) => {
      const option = document.createElement("option");
      option.value = manager.id;
      option.textContent = `${manager.name}`;
      select.appendChild(option);
    })

    clone.querySelector(".address").textContent = object.address;

    const platforms = await getAllPlatform()  
    const secondSelect = clone.querySelector('.choose_platform')
    secondSelect.innerHTML = ""
    const defaultPlatformOption = document.createElement("option");
    defaultPlatformOption.textContent = "Выбрите платформу";
    defaultPlatformOption.disabled = true;
    defaultPlatformOption.selected = true;
    secondSelect.appendChild(defaultPlatformOption);
    platforms.forEach((platform) => {
      const platformOption = document.createElement("option");
      platformOption.value = platform.id;
      platformOption.textContent = `${platform.title}`;
      secondSelect.appendChild(platformOption); 
    });
    clone.querySelector(".telegram_object_chat_id").textContent = object.telegram_object_chat_id;
    clone.querySelector(".telegram_object_chat_link").textContent = object.telegram_object_chat_link;
    

    return clone;
  } catch (error) {
    console.error("Ошибка загрузки объекта:", error);
  }
};


const appendAboutObject = async (object) => {
  const objectCard = await createAboutObject(object);
  const parent = document.querySelector(".form-container");
  parent.innerHTML = "";
  parent.append(objectCard);
};



const createObjectForm = async () => {
  try {
    const template = document.querySelector(".add-object-form");
    const clone = template.content.cloneNode(true);
    const managers = await getUserByRole("manager");   
    
    const select = clone.querySelector('select[name="manager_id"]')
    select.innerHTML = ""
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Выберите менеджера";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    managers.forEach((manager) => {
      const option = document.createElement("option");
      option.value = manager.id;
      option.textContent = `${manager.name}`;
      select.appendChild(option);
    })
    const platforms = await getAllPlatform()  
    const secondSelect = clone.querySelector('.choose_platform')
    secondSelect.innerHTML = ""
    const defaultPlatformOption = document.createElement("option");
    defaultPlatformOption.textContent = "Выбрите платформу";
    defaultPlatformOption.disabled = true;
    defaultPlatformOption.selected = true;
    secondSelect.appendChild(defaultPlatformOption);
    platforms.forEach((platform) => {
      const platformOption = document.createElement("option");
      platformOption.value = platform.id;
      platformOption.textContent = `${platform.title}`;
      secondSelect.appendChild(platformOption); 
    });
    return clone;
  } catch (error) {
    console.error("Ошибка загрузки менеджеров:", error);
  }
};
const appendObjectForm = async () => {
  const objectForm = await createObjectForm();
  const parent = document.querySelector(".form-container");
  parent.innerHTML = "";
  parent.append(objectForm);
};

export { appendUserForm, appendPasswordForm, appendObjectForm,appendAboutObject  };

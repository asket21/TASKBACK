import { appendUserForm, appendPasswordForm, appendObjectForm } from "./forms.js";
import { removeUserFormListeners,removePasswordFormListeners,removeObjectFormListeners } from "./requests.js";
import {currentUserId} from "./requests.js"


const buttons = [...document.querySelectorAll(".call-dialog-button")];
const dialog = document.querySelector(".form-dialog");
const closeButton = dialog?.querySelector(".close-dialog-button");

let dialogOpened = false;
let currentDialogType = null;

export const openDialog = (type) => {
    dialog.showModal();
    document.body.classList.add("scroll-block");
    dialogOpened = true;
    currentDialogType = type;
    
};

export const closeDialog = () => {
    switch(currentDialogType) {
        case "users":
            removeUserFormListeners();
            break;
        case "password":
            removePasswordFormListeners();
            break;
        case "object":
            removeObjectFormListeners();
            break;   
        // Добавьте другие случаи при необходимости
    }
    
    document.querySelector(".form-container").innerHTML = "";
    dialog.close();
    document.body.classList.remove("scroll-block");
    dialogOpened = false;
    currentDialogType = null;
    
};

const handleDialogContent = (type) => {
    switch(type) {
        case "users":
            appendUserForm();
            break;
        case "password":
            appendPasswordForm()            
            break;
        case "object":
            appendObjectForm();
            break;
        default:
            console.log("Unknown dialog type");
    }
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const dialogType = button.dataset.dialogType;
        openDialog(dialogType);
        handleDialogContent(dialogType);
    });
});

closeButton && closeButton.addEventListener("click", closeDialog);
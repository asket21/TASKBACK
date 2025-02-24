import { showTooltip } from "./dom-creators.js";

const form = document.querySelector(".auth-form");
form &&
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        credentials: "include",
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }

      window.location.href = result.redirectUrl;
    } catch (error) {
      showTooltip(error.message)
      return error
    }
  });

const logoutButton = document.querySelector(".logout-button");
logoutButton &&
  logoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Ошибка выхода:", await response.text());
      }
    } catch (error) {
      console.error("Сетевая ошибка:", error);
    }
  });

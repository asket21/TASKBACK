const userModel = require("../db/models/usersModel");
const path = require("path");
const bcrypt = require("bcrypt");

const authUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login | !password){
      res.status(401).send({ message: "Поля не могут быть пустыми" });
      return res.redirect("/index.html");
    }
    const user = await userModel.findOne({ where: { login } });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Неверный логин или пароль" });
      return res.redirect("/index.html");
    } 

    // Сохранение пользователя в сессии
    req.session.userId = user.id;

    res.status(200).json({
      success: true,
      redirectUrl: "/admin/dashboard",
    });
  

  } catch (err) {
// Отладить обработчик
    // res.status(500).json({
    //   success: false,
    //   message: "Ошибка входа: " + err.message,
    // });

  }
};



const sendIndex = (req, res) => {
  if (req.session.userId) {
    try {
      return res.redirect(path.join("/admin/dashboard.html"));
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
  if (req.session.userId) {
    try {
      return res.sendFile(
        path.join(__dirname, "../public/admin/dashboard.html")
      );
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Ошибка выхода");
    }
  });
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

module.exports = { authUser, sendIndex, sendDashboard, logout };




const checkAuth = (req, res, next) => {
    if (!req.session.userId) {
      console.log('Попытка неавторизованного запроса')
      return res.redirect('/');
    }
    next();
  };

  module.exports = { checkAuth };
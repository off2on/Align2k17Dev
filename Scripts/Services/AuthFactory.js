alignApp.factory('authFactory', function () {
    var factory = {};
    var authed = false;
      factory.checkAuth = function (username,pwd) {
          if ((username == 'Paras' || username=='Ashish' || username=='Akhil' || username=='Admin') && pwd == 'admin')
              authed = true;
          return (authed);
      };

      factory.isAuthed = function () {
          return authed;
      }

      factory.setAuth = function () {
          authed = false;
      }
      return factory;
  });
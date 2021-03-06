function UserService($http, $location, $localStorage) {

  this.findOrCreate = function(facebookInfo) {
    $http.get('/api/users.json')
    .then(function(res) {
      var found = false;
      for (var i = 0; i < res.data.length; i ++) {
          if (res.data[i].facebook == facebookInfo.id ) {
            //  localStorage.setItem('name', facebookInfo.first_name);
            //  localStorage.setItem('facebook', facebookInfo.id);
             $localStorage.facebook = facebookInfo.id;
             $localStorage.name = facebookInfo.first_name;
             found = true;
             $location.path(`/users/${facebookInfo.id}`);
          }
        }
          if (found == false) {
            console.log("TRYING TO MAKE USER...")
            var vals = {name: facebookInfo.first_name, facebook: facebookInfo.id };
            $http.post('/api/users', vals)
            .then(function(res) {
              console.log(res)
              var list = {facebook: facebookInfo.id};
              $http.post('/users/lists', list)
                .then(function() {
                  console.log('List created!');
                });
              console.log('User created!');
              $location.path(`/users/${facebookInfo.id}`);
          })
            .catch(function() {
               console.log("Sorry, seems there's a problem here.")
            })
          }

    })
  }

      this.getUserId = function() {
        return currentUser;
      }

      this.getUserNum = function() {
        return currentUserId;
      }



}


angular
  .module('app')
  .service('UserService', UserService)

const app = angular.module('DecidrApp', []);

app.controller('MainController', ['$http', function($http) {

  this.tester = 'testing angular';

  this.createForm = {};

  this.createSuggestion = () => {
    $http({
      url: '/suggestions',
      method: 'POST',
      data: this.createForm
    }).then(response => {
      console.log(response.data);
    }, error => {
      console.error(error);
    }).catch(err => console.error('Catch:', err));
  }

  this.getSuggestions = () => {
    $http({
      url: '/suggestions',
      method: 'GET',
    }).then(response => {
      this.suggestions = response.data;
      console.log(response.data);
    }, error => {
      console.error(error.message);
    }).catch(err => console.error('catch:', err));
  }

  this.getSuggestions();

}]);

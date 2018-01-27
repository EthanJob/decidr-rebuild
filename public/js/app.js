const app = angular.module('DecidrApp', []);

app.controller('MainController', ['$http', function($http) {

  this.tester = 'testing angular';

  this.createForm = {};

  this.home = true;
  this.rest = false;
  this.sugg = false;

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

  this.activeShow = ($scope) => {
    if ($scope.class !== "active") {
      $scope.class === "active";
    } else {
      console.log('no changes');
    }
  }

  this.episodePage = () => {
    this.home = true;
    this.rest = false;
    this.sugg = false;
  }

  this.restPage = () => {
    this.home = false;
    this.rest = true;
    this.sugg = false;
  }

  this.suggPage = () => {
    this.home = false;
    this.rest = false;
    this.sugg = true;
  }

}]);

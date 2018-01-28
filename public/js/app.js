const app = angular.module('DecidrApp', []);

app.controller('MainController', ['$http', function($http) {

  this.tester = 'testing angular';

  this.formData = {};

  this.home = true;
  this.rest = false;
  this.sugg = false;

  this.data = (rickAndMorty);

  console.log(this.data);

  this.createSuggestion = () => {
    $http({
      url: '/suggestions',
      method: 'POST',
      data: this.formData
    }).then(response => {
      this.suggestions.push(response.data);
      console.log(response.data);
      this.formData.content = null;
    }, error => {
      console.error(error);
    }).catch(err => console.error('Catch:', err));
  }

  this.getSuggestions = () => {
    $http({
      url: '/suggestions',
      method: 'GET'
    }).then(response => {
      this.suggestions = response.data;
      console.log("suggestions:", this.suggestions);
    }, error => {
      console.error(error.message);
    }).catch(err => console.error('catch:', err));
  }

  this.getSuggestions();

  this.deleteSugg = (suggestion) => {
    this.deleteObj = suggestion;
    $http({
      url: '/suggestions/' + this.deleteObj._id,
      method: 'DELETE'
    }).then(response => {
      const removeByIndex = this.suggestions.findIndex(item => item.id === this.deleteObj.id);
      this.suggestions.splice(removeByIndex, 1);
      this.deleteObj = {};
    }, error => {
      console.error(error.message);
    }).catch(err => console.err('Catch', err));
  }

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

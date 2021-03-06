const app = angular.module('DecidrApp', []);

app.controller('MainController', ['$http', function($http) {

  this.formData = {};

  this.showData = {};

  // RANDOM EPISODE DATA >
  this.main = false;
  this.active = false;

  this.showName = null;
  this.season = null;
  this.episode = null;
  this.title = null;
  this.image = null;
  this.link = null;
  // RANDOM EPISODE DATA <

  // RANDOM RESTAURANT DATA >

  // this.price = null;
  this.appear = false;
  this.activePrice = false;

  this.restName = null;
  this.restImage = null;
  this.restMap = null;
  // RANDOM RESTAURANT DATA <

  this.comingSoon = () => {
    alert("Coming soon!");
  }

  // FUNCTIONALITY >
  this.activeShow = (show) => {

    console.log("show:", show);

    if (show === 'rick') {
      this.main = false;
      this.active = true;
      this.showData = (rickAndMorty);
      this.showName = "Rick and Morty";
      console.log("show:", this.showData);
    } else if (show === 'mirror') {
      this.main = false;
      this.active = true;
      this.showData = (mirror);
      this.showName = "Black Mirror";
      console.log("show:", this.showData);
    } else if (show === 'bob') {
      this.main = false;
      this.active = true;
      this.showData = (bobsBurgers);
      this.showName = "Bob's Burgers";
      console.log("show:", this.showData);
    } else if (show === 'office') {
      this.main = false;
      this.active = true;
      this.showData = (theOffice);
      this.showName = "The Office";
      console.log("show:", this.showData);
    } else {
      this.main = false;
    }

  }

  this.begin = () => {
    if (this.active === true) {
      this.main = true;

      let seasonNum = Math.floor(Math.random()*this.showData.length);
      let getEpisode = Math.floor(Math.random()*this.showData[seasonNum].episodes.length);
      let episodeNum = this.showData[seasonNum].episodes[getEpisode].num;
      let episodeTitle = this.showData[seasonNum].episodes[getEpisode].title;
      let image = this.showData[seasonNum].episodes[getEpisode].img;
      let link = this.showData[seasonNum].episodes[getEpisode].link;
      let actualSeason = seasonNum + 1;

      this.season = actualSeason;
      this.episode = episodeNum;
      this.title = episodeTitle;
      this.image = image;
      this.link = link;
    } else {
      alert("Select a show first!");
    }
  }

  // RESTAURANT FUNCTIONS
  this.activeRest = (price) => {

    console.log('params:', price);

    if (price === 'low') {
      this.appear = false;
      this.searchPrice = (lowRange);
      this.activePrice = true;
    } else if (price === 'medium') {
      this.appear = false;
      this.searchPrice = (mediumRange);
      this.activePrice = true;
    } else if (price === 'high') {
      this.appear = false;
      this.searchPrice = (highRange);
      this.activePrice = true;
    }

    console.log('variable:', this.searchPrice);
  }

  this.start = () => {
    if (this.activePrice === true) {
      this.appear = true;

      let restData = Math.floor(Math.random()*this.searchPrice.length);
      let restaurantName = this.searchPrice[restData].name;
      let restaurantImage = this.searchPrice[restData].image;
      let restaurantMap = this.searchPrice[restData].map;

      this.restName = restaurantName;
      this.restImage = restaurantImage;
      this.restMap = restaurantMap;
    } else {
      alert("Select a price range first!");
    }
  }
  // FUNCTIONALITY <

  // PAGE >
  this.home = true;
  this.rest = false;
  this.sugg = false;
  // PAGE <

  this.reload = () => {
    location.reload();
  }

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

  this.likeSugg = (suggestion) => {
    console.log("liked suggestion");
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

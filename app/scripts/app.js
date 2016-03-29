//require('./landing');
 //require('./album');
 //require('./collection');
 //require('./profile');

var albumCAARGO = {
  name: 'CAARGO EP',
  artist: 'CAARGO',
  label: 'G/M',
  year: '2015',
  albumArtUrl: 'images/albumcaargo.jpg',

  songs: [
    { name: 'Traveler', length: '4:36' },
    { name: 'Dreamreader', length: '4:36' },
    { name: 'Mala', length: '4:36' },
    { name: 'Gold', length: '4:36' },
    { name: 'Above', length: '7:10' },
  ]
};





blocJams = angular.module('BlocJams', ['ui.router']); 


blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);
 
   $stateProvider.state('landing', {
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });

   $stateProvider.state('song', {
     url: '/song',
     templateUrl: '/templates/song.html'
   });

   $stateProvider.state('collection', {
     url: '/collection',
     controller: 'Collection.controller',
     templateUrl: '/templates/collection.html'
   });

   $stateProvider.state('album', {
     url: '/album',
     templateUrl: '/templates/album.html',
     controller: 'Album.controller'
   });


}]);


blocJams.controller('Landing.controller', ['$scope', function($scope) {
  console.log("Landing.controller");
  $scope.subText = "turn the music up";

  $scope.subTextClicked = function() {
     $scope.subText += '!';
   };

    $scope.albumURLs = [
     '/images/album-placeholders/album-1.jpg',
     '/images/album-placeholders/album-2.jpg',
     '/images/album-placeholders/album-3.jpg',
     '/images/album-placeholders/album-4.jpg',
     '/images/album-placeholders/album-5.jpg',
     '/images/album-placeholders/album-6.jpg',
     '/images/album-placeholders/album-7.jpg',
     '/images/album-placeholders/album-8.jpg',
     '/images/album-placeholders/album-9.jpg',
   ];

 }]);



blocJams.controller('Collection.controller', ['$scope', function($scope) {

  $scope.albums = [];

  for (var i=0; i < 35; i++) {
    $scope.albums.push(angular.copy(albumPicasso));
  }

}]);



blocJams.controller('Album.controller', ['$scope', function($scope) {
   $scope.album = angular.copy(albumCAARGO);


   var hoveredSong = null;
   var playingSong = null;

   $scope.onHoverSong = function(song) {
    hoveredSong = song;
   };

   $scope.offHoverSong = function(song) {
    hoveredSong = null;
   };

   $scope.getSongState = function(song) {
      if (song === playingSong) {
        return 'playing';
      }

      else if (song === hoveredSong) {
        return 'hovered';
      }

      return 'default';
   };

   $scope.playSong = function(song) {
    playingSong = song;
   };

   $scope.pauseSong = function(song) {
    playingSong = null;
   };

 }]);


























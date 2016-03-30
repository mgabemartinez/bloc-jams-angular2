//require('./landing');
//require('./album');
//require('./collection');
//require('./profile');


// CAARGO EP
var albumCAARGO = {
  name: 'CAARGO EP',
  artist: 'CAARGO',
  label: 'G/M',
  year: '2015',
  albumArtUrl: 'images/albumcaargo.jpg',

  songs: [
    { name: 'Traveler', 
      length: '4:36', 
      audioUrl: '/music/placeholders/Traveler'
    },
    
    { name: 'Dreamreader', 
      length: '4:36', 
      audioUrl: '/music/placeholders/Dreamreader'
    },

    { name: 'Mala', 
      length: '4:36', 
      audioUrl: '/music/placeholders/Mala'
    },

    { name: 'Gold', 
      length: '4:36', 
      audioUrl: '/music/placeholders/Gold'
    },

    { name: 'Above', 
      length: '7:10', 
      audioUrl: '/music/placeholders/Above'
    },
  ]
};




// ANGULAR MODULE
blocJams = angular.module('BlocJams', ['ui.router']); 


// Config
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



// Landing Controller
blocJams.controller('Landing.controller', ['$scope', function($scope) {
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



// Collection Controller
blocJams.controller('Collection.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {

  $scope.albums = [];

  for (var i=0; i < 35; i++) {
    $scope.albums.push(angular.copy(albumCAARGO));
  }

  $scope.playAlbum =function(album) {
    SongPlayer.setSong(album, album.songs[0]); //Targets first song in the array.
  }

}]);



// Album Controller
blocJams.controller('Album.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.album = angular.copy(albumCAARGO);


   var hoveredSong = null;

   $scope.onHoverSong = function(song) {
    hoveredSong = song;
   };

   $scope.offHoverSong = function(song) {
    hoveredSong = null;
   };

   $scope.getSongState = function(song) {
      if (song === SongPlayer.currentSong && SongPlayer.playing) {
        return 'playing';
      }

      else if (song === hoveredSong) {
        return 'hovered';
      }

      return 'default';
   };

   $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
   };

   $scope.pauseSong = function(song) {
    SongPlayer.pause();
   };

}]);



// Player Bar Controller
blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
   $scope.songPlayer = SongPlayer;
 }]);



// SongPlayer Service
blocJams.service('SongPlayer', function() {
  
  var currentSoundFile = null;
  
  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };
  


  return {   
    currentSong: null,
    
    curentAlbum: null,
    
    playing: false,


    play: function() {
      this.playing = true;
      currentSoundFile.play();
    },


    pause: function() {
      this.playing = false;
      currentSoundFile.pause();
    },


    next: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);

      currentTrackIndex++;

      if (currentTrackIndex >= this.currentAlbum.songs.length) {
        currentTrackIndex = 0;
      }

      var song = this.currentAlbum.songs[currentTrackIndex];
      this.setSong(this.currentAlbum, song);
    },


    previous: function() {
      var currentTrackIndex = trackIndex(this.currentAlbum, this.currentSong);

        currentTrackIndex--;

        if (currentTrackIndex < 0) {
          currentTrackIndex = this.currentAlbum.songs.length - 1;
        }

        var song = this.currentAlbum.songs[currentTrackIndex];
        this.setSong(this.currentAlbum, song);
    },


    setSong: function(album, song) {
      if (currentSoundFile) {
        currentSoundFile.stop();
      }

      this.currentAlbum = album;
      this.currentSong = song;

      currentSoundFile = new buzz.sound(song.audioUrl, {
        formats: [ "mp3" ],
        preload: true
      });

      this.play();
    }
  }
});


 blocJams.directive('slider', function(){

  var updateSeekPercentage = function($seekBar, event) {
     var barWidth = $seekBar.width();
     var offsetX =  event.pageX - $seekBar.offset().left;
 
     var offsetXPercent = (offsetX  / $seekBar.width()) * 100;
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(100, offsetXPercent);
 
     var percentageString = offsetXPercent + '%';
     $seekBar.find('.fill').width(percentageString);
     $seekBar.find('.thumb').css({left: percentageString});
   }




   return {
     templateUrl: '/templates/directives/slider.html',
     replace: true,
     restrict: 'E',
     link: function(scope, element, attributes) {
 
      var $seekBar = $(element);
 
      $seekBar.click(function(event) {
        updateSeekPercentage($seekBar, event);
      });
 
      $seekBar.find('.thumb').mousedown(function(event){
        $seekBar.addClass('no-animate');
 
        $(document).bind('mousemove.thumb', function(event){
          updateSeekPercentage($seekBar, event);
        });
 
        //cleanup
        $(document).bind('mouseup.thumb', function(){
          $seekBar.removeClass('no-animate');
          $(document).unbind('mousemove.thumb');
          $(document).unbind('mouseup.thumb');
        });
 
      });
    }
   };
 });



















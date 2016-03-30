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
      { name: 'Traveler', length: 276.00, audioUrl: '/music/placeholders/Traveler' }, 
      { name: 'Dreamreader', length: 266.00, audioUrl: '/music/placeholders/Dreamreader' },
      { name: 'Mala', length: 276.00, audioUrl: '/music/placeholders/Mala' },
      { name: 'Gold', length: 382.00, audioUrl: '/music/placeholders/Gold' },
      { name: 'Above', length: 426.00, audioUrl: '/music/placeholders/Above' }
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
    SongPlayer.play();
   };

   $scope.pauseSong = function(song) {
    SongPlayer.pause();
   };

}]);



// Player Bar Controller
blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', function($scope, SongPlayer) {
  $scope.songPlayer = SongPlayer;

  $scope.volumeClass = function() {
     return {
       'fa-volume-off': SongPlayer.volume == 0,
       'fa-volume-down': SongPlayer.volume <= 70 && SongPlayer.volume > 0,
       'fa-volume-up': SongPlayer.volume > 70
     }
  }
 

  SongPlayer.onTimeUpdate(function(event, time){
    $scope.$apply(function(){
      $scope.playTime = time;
    });
  });
 
 }]);



// SongPlayer Service
blocJams.service('SongPlayer', ['$rootScope', function($rootScope) {
  
  var currentSoundFile = null;
  
  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };
  


  return {   
    currentSong: null,
    
    curentAlbum: null,
    
    playing: false,

    volume: 90,


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


    seek: function(time) {
       // Checks to make sure that a sound file is playing before seeking.
      if(currentSoundFile) {
         // Uses a Buzz method to set the time of the song.
         currentSoundFile.setTime(time);
      }

    },

    onTimeUpdate: function(callback) {
      return $rootScope.$on('sound:timeupdate', callback);
    },

    setVolume: function(volume) {
      if(currentSoundFile){
        currentSoundFile.setVolume(volume);
      }
      this.volume = volume;
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

      currentSoundFile.setVolume(this.volume);

      currentSoundFile.bind('timeupdate', function(e){
        $rootScope.$broadcast('sound:timeupdate', this.getTime());
      });

      this.play();
    }
  }
}]);






blocJams.directive('slider', ['$document', function($document){


  // Returns a number between 0 and 1 to determine where the mouse event happened along the slider bar.
  var calculateSliderPercentFromMouseEvent = function($slider, event) {
     
     var offsetX =  event.pageX - $slider.offset().left; // Distance from left
     var sliderWidth = $slider.width(); // Width of slider
     var offsetXPercent = (offsetX  / sliderWidth);
     
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(1, offsetXPercent);
     
     return offsetXPercent;
  }

  var numberFromValue = function(value, defaultValue) {
     if (typeof value === 'number') {
       return value;
     }
 
     if(typeof value === 'undefined') {
       return defaultValue;
     }
 
     if(typeof value === 'string') {
       return Number(value);
     }
  }


  return {
    templateUrl: '/templates/directives/slider.html',
    replace: true,
    restrict: 'E',
    scope: {
      onChange: '&'
    },    
    link: function(scope, element, attributes) {

      scope.value = 0;
      scope.max = 100;
 
      var $seekBar = $(element);

      attributes.$observe('value', function(newValue) {
        scope.value = numberFromValue(newValue, 0);
      });
 
      attributes.$observe('max', function(newValue) {
        scope.max = numberFromValue(newValue, 100) || 100;
      });

      var percentString = function () {
        var percent = Number(scope.value) / Number(scope.max) * 100;
        var value = scope.value || 0;
        var max = scope.max || 100;
        percent = value / max * 100;
        return percent + "%";
      }
 
      scope.fillStyle = function() {
         return {width: percentString()};
      }
 
      scope.thumbStyle = function() {
         return {left: percentString()};
      }

      scope.onClickSlider = function(event) {
         var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
         scope.value = percent * scope.max;
         notifyCallback(scope.value);
      }

      scope.trackThumb = function() {
         $document.bind('mousemove.thumb', function(event){
           var percent = calculateSliderPercentFromMouseEvent($seekBar, event);
           scope.$apply(function(){
             scope.value = percent * scope.max;
             notifyCallback(scope.value);
           });
         });
 
         //cleanup
         $document.bind('mouseup.thumb', function(){
           $document.unbind('mousemove.thumb');
           $document.unbind('mouseup.thumb');
         });
      };


      var notifyCallback = function(newValue) {
         if(typeof scope.onChange === 'function') {
           scope.onChange({value: newValue});
         }
      };


      
    }
  };
}]);





blocJams.filter('timecode', function(){
   return function(seconds) {
     seconds = Number.parseFloat(seconds);
 
     // Returned when no time is provided.
     if (Number.isNaN(seconds)) {
       return '-:--';
     }
 
     // make it a whole number
     var wholeSeconds = Math.floor(seconds);
 
     var minutes = Math.floor(wholeSeconds / 60);
 
     remainingSeconds = wholeSeconds % 60;
 
     var output = minutes + ':';
 
     // zero pad seconds, so 9 seconds should be :09
     if (remainingSeconds < 10) {
       output += '0';
     }
 
     output += remainingSeconds;
 
     return output;
   }
})














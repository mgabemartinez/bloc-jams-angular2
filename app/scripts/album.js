// Example album
var albumCAARGO = {
  name: 'CAARGO EP',
  artist: 'CAARGO',
  label: 'GM',
  year: '2015',
  albumArtUrl: '/images/album-placeholder.png',
  songs: [
    { name: 'Traveler', length: '4:36' },
    { name: 'Dreamreader', length: '4:26' },
    { name: 'Mala', length: '4:36' },
    { name: 'Gold', length: '6:26' },
    { name: 'Above', length: '7:20' },
  ]  
};

 // Another Example Album
 var albumMarconi = {
   name: 'The Telephone',
   artist: 'Guglielmo Marconi',
   label: 'EM',
   year: '1909',
   albumArtUrl: '/images/album-placeholder.png',
   songs: [
       { name: 'Hello, Operator?', length: '1:01' },
       { name: 'Ring, ring, ring', length: '5:01' },
       { name: 'Fits in your pocket', length: '3:21'},
       { name: 'Can you hear me now?', length: '3:14' },
       { name: 'Wrong phone number', length: '2:15'}
     ]
 };


var createSongRow = function(songNumber, songName, songLength) {
  var template = 

      '<tr>'
    + ' <td class="col-md-1">' + songNumber + '</td>'
    + ' <td class="col-md-9">' + songName + '</td>'
    + ' <td class="col-md-1">' + songLength + '</td>'
    + '</tr>'
    ;

  return $(template);

};



var changeAlbumView = function(album) {

    //Update the album title
    var $albumTitle = $('.album-title');
      $albumTitle.text(album.name);

    // Update the album artist
    var $albumArtist = $('.album-artist');
      $albumArtist.text(album.artist);

    // Update the album meta info
    var $albumMeta = $('.album-meta-info');
      $albumMeta.text(album.year + " on " + album.label);

    // Update album image
    var $albumImage = $('.album-image img');
      $albumImage.attr('src', album.albumArtUrl);

    // Update the song List
    var $songList = $(".album-song-listing");
      $songList.empty();
     

    var songs = album.songs;


    for (var i = 0; i < songs.length; i++) {
      var songData = songs[i];
      
      var $newRow = createSongRow(i + 1, songData.name, songData.length);
        
        $songList.append($newRow);
    }
  };






// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {
   // Wait until the HTML is fully processed.
   $(document).ready(function() {
     

   changeAlbumView(albumCAARGO);


   $(".album-header-container").click(function() {

  
      changeAlbumView(albumMarconi);

   });

  });
}




























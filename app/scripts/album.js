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




// This 'if' condition is used to prevent the jQuery modifications
 // from happening on non-Album view pages.
 //  - Use a regex to validate that the url has "/album" in its path.
 if (document.URL.match(/\/album.html/)) {
   // Wait until the HTML is fully processed.
   $(document).ready(function() {
     alert("album.js")
   });
 }
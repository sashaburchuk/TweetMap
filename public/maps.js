var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 17.7850, lng: -12.4183},
    zoom: 3
  });

  console.log("first display map");

  console.log("Made it past adding heatmap");

  var liveTweets = new google.maps.MVCArray();

  if(io !== undefined) {
    var socket = io.connect('localhost:3000');
    console.log("connected to the socket");
    socket.on('stream', function (tweet) {
      console.log("this is a tweet " + tweet);
      var tweetLocation = new google.maps.LatLng(tweet.coordinates.coordinates[0],tweet.coordinates.coordinates[1], true);

      console.table("The raw coordinates from the tweet object: " + tweet.coordinates);
      console.log("tweetLocation: " + tweetLocation);


      liveTweets.push(tweetLocation);

      console.log("Livetweets: " + liveTweets);

      var image = "/small-dot-icon.png";
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
        icon: image
      });

      setTimeout(function(){
        marker.setMap(null);
      },600);

    });

    socket.on("connected", function(r) {
      socket.emit("start tweets");
    });
  }

  var heatmap;
  console.log(liveTweets);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: liveTweets,
    radius: 25
  });

  heatmap.setMap(map);

}
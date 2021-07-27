
//creating the map variable
var mymap = L.map('mapid').setView([46.94760, 4.53473,], 5).addControl(new L.Control.Fullscreen());
//checks if the map is in fullscreen mode to get out of it when a spot is clicked
//not working, figure out why
var mapState = 0
mymap.on('enterFullscreen', function () {
  mapState = 1;
  console.log("entered full screen");
});


//functions to get the user's location
function watchLocation(successCallback, errorCallback) {
  successCallback = successCallback || function () {};
  errorCallback = errorCallback || function () {};
  // Try HTML5-spec geolocation.
  var geolocation = navigator.geolocation;

  if (geolocation) {
    // We have a real geolocation service.
    try {
      function handleSuccess(position) {
        successCallback(position.coords);
      }

      geolocation.getCurrentPosition(handleSuccess, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 5000 // 5 sec.
      });
    } catch (err) {
      errorCallback();
    }
  } else {
    errorCallback();
  }
}

function initLocation() {
  watchLocation(function (coords) {
    findUser(coords);
  }, function () {
    var errorCoordsContainer = document.getElementById("errorCoordsContainer"); //container to print the coordinates or an error message
    errorCoordsContainer.innerHTML = '<div style="margin-top:20px;"></div>';
    errorCoordsContainer.insertAdjacentHTML("beforeend", "<b>Please enable your location services and reload the page.</b>");
  });
}

function findUser(coords) {
  var marker = L.marker([coords.latitude, coords.longitude], {icon: icon}).bindPopup('<p class="locationPin">Your are here</p>');
  mymap.addLayer(marker);
  mymap.setView([coords.latitude, coords.longitude], 19)
};


//creating and displaying the map
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© <a href= "https://osm.org/copyright"> OpenStreetMap </a> contributors',
  minZoom: 1,
  maxZoom: 20,
}).addTo(mymap);
//different pin icon for the location of the person
var icon = L.icon({
  iconUrl: "../position.svg",
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5] //center the marker on the position
})

//creating the marker clusters
var markers = L.markerClusterGroup();


//displays the spots on the map
function addSpotsToMap(spots) {
  for (spot in spots) {
    var long = spots[spot].o;
    var lat = spots[spot].a;
    var marker = L.marker([lat, long]);
    var spotName = spots[spot].n;
    if (spotName == "u") {
      spotName = "Unnamed spot"
    }
    //binds a popup on the map for each spot and clicking on it will call the displaySpotInfo function
    marker.bindPopup("<p><a href='javascript:displaySpotInfo(\"" + spotName + "\",\"" + lat + "\",\"" + long + "\")'>" + spotName + "</a></p>");
    markers.addLayer(marker);  //add the marker to the cluster group
  }
  mymap.addLayer(markers);
}

//finding the div where we put the spot's info
var spotNameContainer = document.getElementById("spotNameContainer");
var spotPicturesContainer = document.getElementById("spotPicturesContainer");
var spotDescriptionContainer = document.getElementById("spotDescriptionContainer");
var spotMetadataContainer = document.getElementById("spotMetadataContainer");
var spotCoordinatesContainer = document.getElementById("spotCoordinatesContainer");
var spotVideosContainer = document.getElementById("spotVideosContainer");

//displays the spot's info (description, pics etc...) on the current page
function displaySpotInfo(name, lat, long) {
  //checks if the user is in fullscreen mode and toggles it if yes
  if (mapState == 1) {
    mymap.toggleFullScreen;
  }


  //clears the div containers in case of a previous spot was already being displayed
  spotNameContainer.innerHTML = "";
  spotPicturesContainer.innerHTML = "";
  spotDescriptionContainer.innerHTML = "";
  spotMetadataContainer.innerHTML = "";
  spotCoordinatesContainer.innerHTML = "";
  spotVideosContainer.innerHTML = "";

  //scrolls to the spot info so people can see that it is being displayed (it should also keep the disclaimer on their sight)
  document.getElementById('scrollTo').scrollIntoView();

  spotName = name;

  //adding the name of the spot
  spotNameContainer.insertAdjacentHTML("beforeend", "<p>" + spotName + "</p>"); //is it necessary to create a p tag inside of the div ?
  spotNameContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:3%;"></div>');

  //getting the spot information in the json file
  var spotInfoRequest = new XMLHttpRequest();
  spotInfoRequest.open('GET', 'https://Explore-outdoors.org/cliff_diving/cliff_diving_spots/' + name + '/spotInfo.json');
  spotInfoRequest.onload = function () {
    var spotInfo = JSON.parse(spotInfoRequest.responseText);

    //adding the pictures, displaying 2 pics by line
    spotPictures = "";
    var picCounter = 0;
    for (i = 0; i < spotInfo[0].p; i++) {
      picCounter += 1;
      if (picCounter > 2) {
        spotPicturesContainer.insertAdjacentHTML("beforeend", "<div>" + spotPictures + "</div>");
        spotPicturesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:3%;"></div>');
        spotPictures = "";
        picCounter = 0;
      }
      spotPictures += "<img src='../cliff_diving_spots/" + name + "/picture" + i + ".jpg'  alt=''>"
    }
    spotPicturesContainer.insertAdjacentHTML("beforeend", spotPictures);
    spotPicturesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:3%;"></div>');


    //adding the description
    spotDescriptionContainer.insertAdjacentHTML("beforeend", "<p>" + spotInfo[0].d + "</p>");
    spotDescriptionContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:2%;"></div>');

    //adding the heights
    spotMetadataContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='spot_height.svg' width=5%> Heights from " + spotInfo[0].mi + "m to " + spotInfo[0].ma + "m<span style='margin-right:3%;'></span>")

    /*
    //adding the legality
    spotMetadataContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='spot_legality.svg' width=5%> Legality : "+ spotInfo[0].legality)
    */

    //adding video links
    if (spotInfo[0]["v"].length > 0) {
      spotVideosContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:3%;"></div>');
      spotVideosContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='video.svg' width=4%><span style='margin-right:2%;'></span>Videos at the spot : ")
      for (i = 0; i < spotInfo[0]["v"].length; i++) {
        v = i + 1
        spotVideosContainer.insertAdjacentHTML("beforeend", "<a href ='" + spotInfo[0]["v"][i] + "' target='_blank'>video " + v + " </a>")
      }
    }
  };
  spotInfoRequest.send();

  spotCoordinatesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:3%;"></div>');
  spotCoordinatesContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='coordinates.svg' width='4%'> Coordinates : " + lat + ", " + long);
}


//Getting the spots from the geojson file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://Explore-outdoors.org/calisthenics/calisthenics_spots/spotCoordinates.json');
ourRequest.onload = function () {
  var cliffDivingSpots = JSON.parse(ourRequest.responseText);
  addSpotsToMap(cliffDivingSpots);
};
ourRequest.send();

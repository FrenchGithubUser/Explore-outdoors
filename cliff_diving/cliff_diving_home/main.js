//creating the map variable
var mymap = L.map('mapid').setView([48.85, 2.35], 10);


//creating and displaying the map
L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
attribution: '© <a href= "https://osm.org/copyright"> OpenStreetMap </a> contributors',
minZoom: 1,
maxZoom: 20,
}).addTo(mymap);

//creating the marker clusters
var markers = L.markerClusterGroup();


//displays the spots on the map
function addSpotsToMap(spots) {
  for(spot in spots){
    var marker = L.marker([spots[spot].lat, spots[spot].long]);
    var spotName = spots[spot].name;
    var spotDescription = spots[spot].description;
    marker.bindPopup("<p><a href='javascript:displaySpotInfo(\""+spotName+"\", \""+spotDescription+"\")'>"+spotName+"</a></p>");
    markers.addLayer(marker);  //add the marker to the cluster group
  }
  mymap.addLayer(markers);
}


//finding the div where we put the spot's info
var spotInfoContainer = document.getElementById("testtttt");


//displays the spot's info (description, pics etc...) on the current page
function displaySpotInfo(name, description) {
  spotName = "<div class='spotNameTitle'>"+name+"</div>"
  spotDescription = "<div class='spotDescription'>"+description+"</div>"
  spotInfoContainer.insertAdjacentHTML("beforeend", spotName);
  spotInfoContainer.insertAdjacentHTML("beforeend", spotDescription);
}


//Getting the spots from the json file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_home/cliff_diving_spots.json');
ourRequest.onload = function() {
  var cliffDivingSpots = JSON.parse(ourRequest.responseText);
  addSpotsToMap(cliffDivingSpots);
};
ourRequest.send();

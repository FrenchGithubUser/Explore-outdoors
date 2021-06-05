// to do : look for a way to delete the injected html to display a new spot
//add a text file for the description of the spots instead of putting it in the json





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
    var pictureAmount = spots[spot].pictureAmount;
    //binds a popup on the map for each spot and clicking on it will call the displaySpotInfo function
    marker.bindPopup("<p><a href='javascript:displaySpotInfo(\""+spotName+"\",\""+pictureAmount+"\")'>"+spotName+"</a></p>");
    markers.addLayer(marker);  //add the marker to the cluster group
  }
  mymap.addLayer(markers);
}


//finding the div where we put the spot's info
var spotInfoContainer = document.getElementById("testtttt");


//displays the spot's info (description, pics etc...) on the current page
function displaySpotInfo(name, pictureAmount) {
  spotName = "<div class='spotNameTitle'>"+name+"</div>";

  spotPictures = "<div class='spotPictures'>";

  for(i=0; i<pictureAmount; i++){
    spotPictures += "<img src='../cliff_diving_spots/"+name+"/picture"+i+".jpg' width='400px' alt=''>"
  }
  spotPictures += "</div>";
  console.log(spotPictures)
  spotInfoContainer.insertAdjacentHTML("beforeend", "<p>"+spotName+"</p>");
  displaySpotDescription(name);
  spotInfoContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:100px;"></div>');
  spotInfoContainer.insertAdjacentHTML("beforeend", spotPictures);
}


//function to request display the spot description when clicked on
function displaySpotDescription(name) {
  var descriptionRequest = new XMLHttpRequest();
  descriptionRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_spots/'+name+'/description.txt');
  descriptionRequest.onload = function() {
    var description = descriptionRequest.responseText;
    spotInfoContainer.insertAdjacentHTML("beforeend", "<p>"+description+"</p>");
  };
  descriptionRequest.send();
}



//Getting the spots from the json file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_home/cliff_diving_spots.json');
ourRequest.onload = function() {
  var cliffDivingSpots = JSON.parse(ourRequest.responseText);
  addSpotsToMap(cliffDivingSpots);
};
ourRequest.send();


//creating the map variable
var mymap = L.map('mapid').setView([46.94760, 4.53473,], 5);


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
    var lat = spots[spot].lat;
    var long = spots[spot].long;
    var marker = L.marker([lat, long]);
    var spotName = spots[spot].name;
    var spotDescription = spots[spot].description;
    var pictureAmount = spots[spot].pictureAmount;
    //binds a popup on the map for each spot and clicking on it will call the displaySpotInfo function
    marker.bindPopup("<p><a href='javascript:displaySpotInfo(\""+spotName+"\",\""+pictureAmount+"\",\""+lat+"\",\""+long+"\")'>"+spotName+"</a></p>");
    markers.addLayer(marker);  //add the marker to the cluster group
  }
  mymap.addLayer(markers);
}


//finding the div where we put the spot's info
var spotNameContainer = document.getElementById("spotNameContainer");
var spotPicturesContainer = document.getElementById("spotPicturesContainer");
var spotDescriptionContainer = document.getElementById("spotDescriptionContainer");
var spotCoordinatesContainer = document.getElementById("spotCoordinatesContainer");


//displays the spot's info (description, pics etc...) on the current page
function displaySpotInfo(name, pictureAmount, lat, long) {
  //clears the div containers in case of a previous spot was already being displayed
  spotNameContainer.innerHTML = "";
  spotPicturesContainer.innerHTML = "";
  spotDescriptionContainer.innerHTML = "";
  spotCoordinatesContainer.innerHTML = "";

  //goes to the spot info so people can see that it is being displayed (it should also keep the disclaimer on their sight)
  document.getElementById('spotNameContainer').scrollIntoView();

  spotName = name;
  spotPictures = "";
  for(i=0; i<pictureAmount; i++){
    spotPictures += "<img src='../cliff_diving_spots/"+name+"/picture"+i+".jpg' width='400px' alt=''>"
  }
  spotNameContainer.insertAdjacentHTML("beforeend", "<p>"+spotName+"</p>"); //is it necessary to create a p tag inside of the div ?
  spotNameContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:20px;"></div>');
  spotPicturesContainer.insertAdjacentHTML("beforeend", spotPictures);
  spotPicturesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:20px;"></div>');
  displaySpotDescription(name);
  spotCoordinatesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:40px;"></div>');
  spotCoordinatesContainer.insertAdjacentHTML("beforeend", "Coordinates : "+lat+", "+long);
}


//function to request and display the spot description when clicked on
function displaySpotDescription(name) {
  var descriptionRequest = new XMLHttpRequest();
  descriptionRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_spots/'+name+'/description.txt');
  descriptionRequest.onload = function() {
    var description = descriptionRequest.responseText;
    spotDescriptionContainer.insertAdjacentHTML("beforeend", "<p>"+description+"</p>");
  };
  descriptionRequest.send();



  //Getting the spot info stored in a json file
  var spotInfoRequest = new XMLHttpRequest();
  spotInfoRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_spots/'+name+'/spotInfo.json');
  spotInfoRequest.onload = function() {
    var spotInfo = JSON.parse(spotInfoRequest.responseText);
    console.log(spotInfo)
  };
  spotInfoRequest.send();
}


//Getting the spots from the json file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_home/cliff_diving_spots.json');
ourRequest.onload = function() {
  var cliffDivingSpots = JSON.parse(ourRequest.responseText);
  addSpotsToMap(cliffDivingSpots);
};
ourRequest.send();

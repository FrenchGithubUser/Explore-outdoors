
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
    //binds a popup on the map for each spot and clicking on it will call the displaySpotInfo function
    marker.bindPopup("<p><a href='javascript:displaySpotInfo(\""+spotName+"\",\""+lat+"\",\""+long+"\")'>"+spotName+"</a></p>");
    markers.addLayer(marker);  //add the marker to the cluster group
  }
  mymap.addLayer(markers);
}


//finding the div where we put the spot's info
var spotNameContainer = document.getElementById("spotNameContainer");
var spotPicturesContainer = document.getElementById("spotPicturesContainer");
var spotDescriptionContainer = document.getElementById("spotDescriptionContainer");
var spotMetadataContainer = document.getElementById("spotMetadata");
var spotCoordinatesContainer = document.getElementById("spotCoordinatesContainer");
var spotVideosContainer = document.getElementById("spotVideosContainer");

//displays the spot's info (description, pics etc...) on the current page
function displaySpotInfo(name, lat, long) {
  //clears the div containers in case of a previous spot was already being displayed
  spotNameContainer.innerHTML = "";
  spotPicturesContainer.innerHTML = "";
  spotDescriptionContainer.innerHTML = "";
  spotMetadata.innerHTML = "";
  spotCoordinatesContainer.innerHTML = "";
  spotVideosContainer.innerHTML = "";

  //scrolls to the spot info so people can see that it is being displayed (it should also keep the disclaimer on their sight)
  document.getElementById('spotNameContainer').scrollIntoView();

  spotName=name;

  //adding the name of the spot
  spotNameContainer.insertAdjacentHTML("beforeend", "<p>"+spotName+"</p>"); //is it necessary to create a p tag inside of the div ?
  spotNameContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:20px;"></div>');

  //getting the spot information in the json file
  var spotInfoRequest = new XMLHttpRequest();
  spotInfoRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_spots/'+name+'/spotInfo.json');
  spotInfoRequest.onload = function() {
    var spotInfo = JSON.parse(spotInfoRequest.responseText);

    //adding the pictures
    spotPictures = "";
    for(i=0; i<spotInfo[0].pictureAmount; i++){
      spotPictures += "<img src='../cliff_diving_spots/"+name+"/picture"+i+".jpg' width='400px' alt=''>"
    }
    spotPicturesContainer.insertAdjacentHTML("beforeend", spotPictures);
    spotPicturesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:20px;"></div>');

    //adding the description
    spotDescriptionContainer.insertAdjacentHTML("beforeend", "<p>"+spotInfo[0].description+"</p>");
    spotDescriptionContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:20px;"></div>');

    //adding the heights
    spotMetadataContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='spot_height.svg' width=50px> Heights from "+ spotInfo[0].minHeight +"m to "+spotInfo[0].maxHeight+"m<span style='margin-right:30px;'></span>")

    //adding the legality
    spotMetadataContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='spot_legality.svg' width=50px> Legality : "+ spotInfo[0].legality)

    //adding video links
    for(video in spotInfo[0][videos]){
      spotVideosContainer.insertAdjacentHTML("beforeend",video)
    }
  };
  spotInfoRequest.send();



  spotCoordinatesContainer.insertAdjacentHTML("beforeend", '<div style="margin-top:40px;"></div>');
  spotCoordinatesContainer.insertAdjacentHTML("beforeend", "<img class='logo' src='coordinates.svg' width='40px'> Coordinates : "+lat+", "+long);
}



//Getting the spots from the json file
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://thomastraineau.github.io/Outdoor-spots/cliff_diving/cliff_diving_home/cliff_diving_spots.json');
ourRequest.onload = function() {
  var cliffDivingSpots = JSON.parse(ourRequest.responseText);
  addSpotsToMap(cliffDivingSpots);
};
ourRequest.send();

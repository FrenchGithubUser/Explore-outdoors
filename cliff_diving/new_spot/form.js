//functions to handle the answers of the form and to send them to the google sheet
function LoadFile(event, fileDataID, mimeTypeID, fileNameID)
{
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    console.log(e.target.result);
    var fileData = e.target.result.substr(e.target.result.indexOf(",")+1);
    var mimeTypeStart = e.target.result.indexOf("data:") + 5;
    var mimeTypeEnd = e.target.result.indexOf(";");
    var mimeType = e.target.result.substr(mimeTypeStart, mimeTypeEnd - mimeTypeStart);
    var fileName = file.name;
    document.getElementById(fileDataID).value = fileData;
    document.getElementById(mimeTypeID).value = mimeType;
    document.getElementById(fileNameID).value = fileName;
  };
  reader.readAsDataURL(file);
}

function clickedFunc(){
var loadingContainerVar = document.getElementById("loadingContainer");
loadingContainerVar.insertAdjacentHTML("beforeend","<p><b>Your spot is being sent... You will be brought to a new page soon, please don't exit this page.</b></p>");
return true;
}


//functions to display the map and put a pin on it
let mymap, pin //variables for the map and the pin


window.onload = () => {
  mymap = L.map('detailsMap').setView([46.94760, 4.53473,], 5).addControl(new L.Control.Fullscreen());

  //creating and displaying the map
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© <a href= "https://osm.org/copyright"> OpenStreetMap </a> contributors',
  minZoom: 1,
  maxZoom: 20,
  }).addTo(mymap);

  mymap.on("click", mapClickListen)
}

//functions to get the user's location
//different pin icon for the location of the person
var icon = L.icon({
  iconUrl: "../position.svg",
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5] //center the marker on the position
})

function watchLocation(successCallback, errorCallback) {
  successCallback = successCallback || function(){};
  errorCallback = errorCallback || function(){};
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
  watchLocation(function(coords) {
    findUser(coords);
  }, function() {
    console.log('error');
  });
}

function findUser(coords){
    var marker = L.marker([coords.latitude, coords.longitude], {icon:icon}).bindPopup('<p class="locationPin">Your are here</p>');
    mymap.addLayer(marker);
    mymap.setView([coords.latitude, coords.longitude], 19)
    document.querySelector("#lat").value = coords.latitude.toFixed(7)
    document.querySelector("#lon").value = coords.longitude.toFixed(7)
    var validContainer = document.getElementById("coordinatesValidation");
    validContainer.innerHTML = "";
    validContainer.insertAdjacentHTML("beforeend","<p><b>Coordinates set : ("+coords.latitude.toFixed(7)+", "+coords.longitude.toFixed(7)+")</b><br>You can still change them placing another pin.</p>");
};



function mapClickListen(e){
  //retreiving the data from the click
  let pos = e.latlng
  //adding a marker
  addMarker(pos)
  //add the coordinates to the input feild
  document.querySelector("#lat").value = pos.lat.toFixed(7)
  document.querySelector("#lon").value = pos.lng.toFixed(7)

  var validContainer = document.getElementById("coordinatesValidation");
  validContainer.innerHTML = "";
  validContainer.insertAdjacentHTML("beforeend","<p><b>Coordinates set : ("+pos.lat.toFixed(7)+", "+pos.lng.toFixed(7)+")</b><br>You can still change them placing another pin.</p>");
}

function addMarker(pos){
  //if there is already a marker on the map, we delete it
  if(pin != undefined){
    mymap.removeLayer(pin)
  }
  pin = L.marker(pos, {draggable:true}).addTo(mymap)
  //listens to the end of the drag of the pin and actualises the coordinates
  pin.on("dragend", function(e){
    pos = e.target.getLatLng()
    document.querySelector("#lat").value = pos.lat
    document.querySelector("#lon").value = pos.lng
  })

}

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
let mymap, pin //variables for the map and

window.onload = () => {
  mymap = L.map('detailsMap').setView([46.94760, 4.53473,], 5);

  //locates the person on the map
  mymap.locate({setView: true})
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('<p class="locationPin">Your are here</p>');
            var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            });
            mymap.addLayer(marker);
            mymap.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });

  //creating and displaying the map
  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
  attribution: '© <a href= "https://osm.org/copyright"> OpenStreetMap </a> contributors',
  minZoom: 1,
  maxZoom: 20,
  }).addTo(mymap);
  mymap.on("click", mapClickListen)
}

function mapClickListen(e){
  //retreiving the data from the click
  let pos = e.latlng
  //adding a marker
  addMarker(pos)
  //add the coordinates to the input feild
  document.querySelector("#lat").value = pos.lat
  document.querySelector("#lon").value = pos.lng
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

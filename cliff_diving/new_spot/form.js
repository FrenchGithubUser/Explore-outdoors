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

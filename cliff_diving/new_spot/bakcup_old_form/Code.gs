function doGet(e) {
  var htmlOutput =  HtmlService.createTemplateFromFile('newSpotForm');
  htmlOutput.message = '';
  return htmlOutput.evaluate();
}


function doPost(e) {

  Logger.log(JSON.stringify(e));

  var destination_id = '1Do9X6YKI1XslWER5o3U8VtUiffJXbeGe';  // ID OF GOOGLE DRIVE DIRECTORY;
  var destination = DriveApp.getFolderById(destination_id);

  var data1 = Utilities.base64Decode(e.parameter.fileData1);
  var blob1 = Utilities.newBlob(data1, e.parameter.mimeType1, e.parameter.fileName1);
  destination.createFile(blob1);

  var data2 = Utilities.base64Decode(e.parameter.fileData2);
  var blob2 = Utilities.newBlob(data2, e.parameter.mimeType2, e.parameter.fileName2);
  destination.createFile(blob2);

  var data3 = Utilities.base64Decode(e.parameter.fileData3);
  var blob3 = Utilities.newBlob(data3, e.parameter.mimeType3, e.parameter.fileName3);
  destination.createFile(blob3);

  var data4 = Utilities.base64Decode(e.parameter.fileData4);
  var blob4 = Utilities.newBlob(data4, e.parameter.mimeType4, e.parameter.fileName4);
  destination.createFile(blob4);

  var data5 = Utilities.base64Decode(e.parameter.fileData5);
  var blob5 = Utilities.newBlob(data5, e.parameter.mimeType5, e.parameter.fileName5);
  destination.createFile(blob5);

  listRecord(e.parameter.spotName, e.parameter.spotLong, e.parameter.spotLat, e.parameter.spotMinHeight, e.parameter.spotMaxHeight, e.parameter.spotDescription, e.parameter.spotVideos, e.parameter.fileName1, e.parameter.fileName2, e.parameter.fileName3, e.parameter.fileName4, e.parameter.fileName5);

  var htmlOutput =  HtmlService.createTemplateFromFile('submitted');
  return htmlOutput.evaluate();

}

function listRecord(spotName, spotLong, spotLat, spotMinHeight, spotMaxHeight, spotDescription, spotVideos, filename1, filename2, filename3, filename4, filename5)
{
  var url = 'https://docs.google.com/spreadsheets/d/16tP2go32PHdxT_sWAypsDBQ0s6V8KZSUL_TIDys3qnE/edit#gid=0';  //URL OF GOOGLE SHEET;
  var ss= SpreadsheetApp.openByUrl(url);
  var recordsSheet = ss.getSheetByName("Records");
  recordsSheet.appendRow([spotName, spotLong, spotLat, spotMinHeight, spotMaxHeight, spotDescription, spotVideos, filename1, filename2, filename3, filename4, filename5, new Date()]);
}

function getUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}

function displayUser(){
	var userName = document.getElementById("inputUser").value;

	var sUrl = "https://api.twitch.tv/kraken/channels/" + userName + "/videos?limit=100&broadcasts=true&broadcaster_language=de";
	httpGetAsync(sUrl, processPastBroadcasts);

}

function formatDate(sDate) {
	var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var dayNames = ["So", "Mo", "Tue", "Mi", "Thu", "Fri", "Sa"];

var date = new Date(sDate);
// date.setDate(date.getDate()-1);
var day = date.getDate();

var monthIndex = date.getMonth();
var dayIndex = date.getDay();
var year = date.getFullYear();

return (dayNames[dayIndex] + ", " + day + " " + monthNames[monthIndex] + ", " + date.toTimeString());
}

function processPastBroadcasts(sResult) {
	var jsonResult = JSON.parse(sResult);
	var resultTable = document.getElementById("resultTable");
	resultTable.innerHTML = "";
	var i = 0;

	$.each(jsonResult.videos, function(key, value) {
		var row = resultTable.insertRow(i);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

	

		// Add some text to the new cells:
		cell1.innerHTML = formatDate(value.created_at);
		cell2.innerHTML = (value.length / 3600.0).toFixed(2);
	});
}

function httpGetAsync(sUrl, callback)
{
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(xmlHttp.responseText);
	}
    xmlHttp.open("GET", sUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
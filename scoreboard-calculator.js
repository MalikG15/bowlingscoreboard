$(document).ready(function() {

	var scoretable = $('#scoreboard');
	var scores = [8, 1, 10, 5, 5, 8, 0, 10, 10, 9, 1, 8, 1, 9, 1, 10, 7, 2];

	for (var x = 0; x < scores.length; x++) {
		scoretable.append("<tr><td>" + scores[x] + "</td></tr>");
	}

});
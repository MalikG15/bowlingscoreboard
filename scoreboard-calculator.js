$(document).ready(function() {

	var scoretable = $('#scoreboard');
	var scores = new Array(8, 1, 10, 5, 5, 8, 0, 10, 10, 9, 1, 8, 1, 9, 1, 9, 1, 2);

	var frame = 1;
	var score = 0;
	var rowTenLoc = 1;
	for (var x = 0; x < scores.length;) {
		if (scores[x] === 10) {
			score += calculateNextTwoThrows(x) + 10;
			scoretable.append("<tr><td>" + frame + "</td><td>X</td><td></td><td></td><td>" + score + "</td></tr>");
			x++;
		}
		else if (x + 1 < scores.length) {
			if ((scores[x] + scores[x + 1] === 10)) {
				score += calculateNextThrow(x + 2) + 10;
				scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td>/</td><td></td><td>" + score + "</td></tr>");	
			}
			else {
				score += scores[x] + scores[x + 1];
				scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td>" + scores[x + 1] + "</td><td></td><td>" + score + "</td></tr>");
			}
			x += 2;
		}
		else {
			score += scores[x];
			scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td></td><td></td><td>" + score + "</td></tr>");
			x++;
		}

		if (frame < 10) frame++;
		if (frame == 10 && x < scores.length) { 
			scoretable.append("<tr><td>10</td><td id='1'></td><td id='2'></td><td id='3'></td><td id='4'></td></tr>"); 
			completeTenthRow(x);
			break;
		}
	}

	function completeTenthRow(index) {
		for (var x = index; x < scores.length;) {
			if (scores[x] === 10) {
				score += 10;
				$('#' + rowTenLoc++).text("X");
				x++;
			}
			else if (x + 1 < scores.length && (scores[x] + scores[x + 1] === 10)) {
					score += 10;
					$('#' + rowTenLoc++).text(scores[x]);
					$('#' + rowTenLoc++).text("/");
					x += 2;
			}
			else {
				score += scores[x];
				$('#' + rowTenLoc++).text(scores[x]);
				x++;
			}
		}
		$("#4").text(score);
	}
	
	function calculateNextTwoThrows(index) {
		if (index + 1 < scores.length && index + 2 < scores.length) {
			return scores[index + 1] + scores[index + 2];
		}

	return 0;
	}

	function calculateNextThrow(index) {
		if (index < scores.length) {
			return scores[index];
		}

	return 0;
	}

});
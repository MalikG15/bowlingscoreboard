$(document).ready(function() {

	var scoretable = $('#scoreboard');
	var scores = new Array(8, 1, 10, 5, 5, 8, 0, 10, 10, 9, 1, 8, 1, 9, 1, 10, 7, 2);

	var frame = 1;
	var score = 0;
	for (var x = 0; x < scores.length;) {
		//scoretable.append("<tr><td>" + frame + "<td>");

		if (frame === 10) {
			break;
		}
		if (scores[x] === 10) {
			score += calculateNextTwoThrows(x) + 10;
			scoretable.append("<tr><td>" + frame + "</td><td>X</td><td></td><td></td><td>" + score + "</td></tr>");
			x++;
		}
		else if (x + 1 < scores.length) {
			if ((scores[x] + scores[x + 1] === 10)) {
				//alert(scores[x + 1]);
				score += calculateNextThrow(x + 2) + 10;
				scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td>/</td><td></td><td>" + score + "</td></tr>");	
			}
			else {
				//alert(scores[x + 1]);
				score += scores[x] + scores[x + 1];
				scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td>" + scores[x + 1] + "</td><td></td><td>" + score + "</td></tr>");
			}
			x += 2;
		}

		frame++;
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
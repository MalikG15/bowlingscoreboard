$(document).ready(function() {

	$('#begin_calc_button').click(function() {
		var input = $("#score_list").val();
		var splitted_input = input.split(" ");
		var scores = new Array();
		var x = 0;
		for (var num in splitted_input) {
			scores[x++] = parseInt(splitted_input[num]);
		}

		if (scores.length > 0) {
			$('#scoreboard').empty();
			calculate(scores);
		}
	});

	function calculate(scores) {
		var scoretable = $('#scoreboard');
		var frame = 1;
		var score = 0;
		var frameTenLocation = 1;
		scoretable.append("<tr><th>FR</th><th>R1</th><th>R2</th><th>R3</th><th>Score</th></tr>")
		for (var x = 0; x < scores.length;) {
			if (scores[x] === 10) {
				score += calculateNextTwoThrows(scores, x) + 10;
				scoretable.append("<tr><td>" + frame + "</td><td>X</td><td></td><td></td><td>" + score + "</td></tr>");
				x++;
			}
			else if (x + 1 < scores.length) {
				if ((scores[x] + scores[x + 1] === 10)) {
					score += calculateNextThrow(scores, x + 2) + 10;
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
				completeTenthRow(scoretable, scores, score, frameTenLocation, x);
				break;
			}
		}
	}

	function completeTenthRow(scoretable, scores, score, frameTenLocation, index) {
		scoretable.append("<tr><td>10</td><td id='1'></td><td id='2'></td><td id='3'></td><td id='4'></td></tr>"); 
		for (var x = index; x < scores.length;) {
			if (scores[x] === 10) {
				score += 10;
				$('#' + frameTenLocation++).text("X");
				x++;
			}
			else if (x + 1 < scores.length && (scores[x] + scores[x + 1] === 10)) {
				score += 10;
				$('#' + frameTenLocation++).text(scores[x]);
				$('#' + frameTenLocation++).text("/");
				x += 2;
			}
			else {
				score += scores[x];
				$('#' + frameTenLocation++).text(scores[x]);
				x++;
			}
		}
		$("#4").text(score);
	}
	
	function calculateNextTwoThrows(scores, index) {
		if (index + 1 < scores.length && index + 2 < scores.length) {
			return scores[index + 1] + scores[index + 2];
		}

	return 0;
	}

	function calculateNextThrow(scores, index) {
		if (index < scores.length) {
			return scores[index];
		}

	return 0;
	}

});
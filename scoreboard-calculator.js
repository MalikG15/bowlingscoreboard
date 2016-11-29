$(document).ready(function() {

	// Attaches an event handler to the button
	// which creates the scoreboard only if
	// the input is not empty.
	$('#begin_calc_button').click(function() {
		var input = $("#score_list").val();
		if (!input || /^\s*$/.test(input)) {
			return;
		}
		var splitted_input = input.split(" ");
		var scores = new Array();
		var x = 0;
		console.log(splitted_input);
		for (var num in splitted_input) {
			if (splitted_input[num] || !(/^\s*$/.test(splitted_input[num]))) {
			scores[x++] = parseInt(splitted_input[num]);
			}
		}

		$('#scoreboard').empty();
		calculate(scores);
	});

	// Creates the rows in the table and appends it
	// to the table.
	function calculate(scores) {
		var scoretable = $('#scoreboard');
		var frame = 1;
		var score = 0;
		var frameTenIndex = 1;
		// Creates the header row
		scoretable.append("<tr><th>FR</th><th>R1</th><th>R2</th><th>R3</th><th>Score</th></tr>")
		for (var x = 0; x < scores.length;) {
			// Calculates strikes
			if (scores[x] === 10) {
				score += calculateNextTwoThrows(scores, x) + 10;
				scoretable.append("<tr><td>" + frame + "</td><td>X</td><td></td><td></td><td>" + score + "</td></tr>");
				x++;
			}
			else if (x + 1 < scores.length) {
				// Calculates spares
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
			// Calculates remaining attempts
			else {
				score += scores[x];
				scoretable.append("<tr><td>" + frame + "</td><td>" + scores[x] + "</td><td></td><td></td><td>" + score + "</td></tr>");
				x++;
			}

			// Increases the frames, if the
			// frame reaches ten then a special
			// algorithm is used for that specific frame.
			if (frame < 10) frame++;
			if (frame == 10 && x < scores.length) { 
				completeTenthRow(scoretable, scores, score, frameTenIndex, x);
				break;
			}
		}
	}

	// We initially create the row, then
	// we add onto it and change the text of
	// the cells as we go.
	function completeTenthRow(scoretable, scores, score, frameTenIndex, index) {
		scoretable.append("<tr><td>10</td><td id='1'></td><td id='2'></td><td id='3'></td><td id='4'></td></tr>"); 
		for (var x = index; x < scores.length;) {
			// This code prevents us from going beyond
			// once the tenth frame is filled.
			if (frameTenIndex > 4) break;
			if (scores[x] === 10) {
				score += 10;
				$('#' + frameTenIndex++).text("X");
				x++;
			}
			else if (x + 1 < scores.length && (scores[x] + scores[x + 1] === 10)) {
				score += 10;
				$('#' + frameTenIndex++).text(scores[x]);
				$('#' + frameTenIndex++).text("/");
				x += 2;
			}
			else {
				score += scores[x];
				$('#' + frameTenIndex++).text(scores[x]);
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
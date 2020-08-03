// Простенькая криптосистема... взломать легко, но думаю всем лень.

//var answers = [3, 1, 2, 4, 3, 4, 1, 6, 10, 3];  -  Это можно удалить, чтобы любопытные не подсмотрели.
var questionsCount = 10;
var encryptedAnswers = [7298706024529920000, 3628800, 958003200, 24908083200, 1067062284288000, 348713164800, 20922789888000, 38414242234368000, 1216451004088320000, 119750400];
var encryptLevels = [20, 10, 12, 13, 17, 14, 16, 18, 19, 11];

// Функция для проверки корректности ответа (не думаю, что кто-нибудь захочет в консоли вызывать эту функцию для проверки ответа)
function EncryptAnswer(answer, encLevel) {
	if (encLevel <= 0) {
		return Math.round(answer);
	}
	return EncryptAnswer(answer * encLevel, --encLevel);
}

// Проверка всего теста
function CheckResults() {
	questionBlocks = document.getElementsByClassName("question-container");
	var sumAnswers = 0;
	var questionAnswer;
	for (var i = 0; i < questionsCount; i++) {
		questionAnswer = questionBlocks[i].querySelector(".question-answer input[type='radio']:checked");
		if (questionAnswer == undefined) {
			var subSum = 0;
			questionBlocks[i].querySelectorAll(".question-answer input[type='checkbox']:checked").forEach(function(el, idx) {
				subSum += parseInt(el.getAttribute("tag-id"));
			});
			if (subSum <= 0) {
				document.getElementById("results-text").innerHTML = "Вы не ответили на все вопросы!";
				return;
			} else if (EncryptAnswer(subSum, encryptLevels[i]) === encryptedAnswers[i]) {
				sumAnswers++;
			}
		} else if (EncryptAnswer(parseInt(questionAnswer.getAttribute("tag-id")), encryptLevels[i]) === encryptedAnswers[i]) {
			sumAnswers++;
		}
	}
	document.querySelectorAll(".question-container .question-answer input[type='radio']:checked").forEach(function(el, idx) {
		el.checked = false;
	});
	document.querySelectorAll(".question-container .question-answer input[type='checkbox']:checked").forEach(function(el, idx) {
		el.checked = false;
	});
	
	document.getElementById("results-text").innerHTML = "Всего правильных ответов " + sumAnswers + " из " + questionsCount;
}
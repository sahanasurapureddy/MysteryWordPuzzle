"use strict";

function MysterySearchLogic(gameId,list) {
	var board = {
		matrix: [],
		size: 15 

	};
	var thisWord = {
		viablePaths: [], 
		wordFitted: false 
	};
	var wordLocations = {};
	this.setUpGame = function() {
		board.matrix = createMatrix(board.size);
		fitWordsIntoMatrix(list, board.matrix);
		fillWithRandomLetters(board.matrix);
	}

	function createMatrix(size) {
		var matrix = new Array(size);
		for (var i = 0; i < size; i++) {
			matrix[i] = new Array(size);
		}
		return matrix;
	}

	function fitWordsIntoMatrix(wordList, matrix) {
		for (var i = 0; i < wordList.length; i++) {
			for (var j = 0; j < wordList[i].length; j++) {
				var trimmedWord = trimWord(wordList[i][j]);
				for (var k = 0; thisWord.wordFitted == false && k < 100; k++) {		
					insertWordIntoMatrix(trimmedWord, matrix);	
				}
				if (thisWord.wordFitted == false) {
					wordList[i] = remove(wordList[i], wordList[i][j]);
					j--;
				}
				else {
					thisWord.wordFitted = false; 
				}	
			}
		}
	}

	function insertWordIntoMatrix(word, matrix) {
		var randX = getRandomNum(matrix.length);
		var randY = getRandomNum(matrix.length);
		if (jQuery.isEmptyObject(matrix[randX][randY]) ||
			matrix[randX][randY] == word.charAt(0)) {
			checkPossibleOrientations(word, matrix, randX, randY);
		}
	}

	function checkPossibleOrientations(w, m, x, y) {
		Object.keys(paths).forEach(function(i) {
			doesOrientationFit(w, m, x, y, paths[i]);
		});

		if (thisWord.viablePaths.length != 0) {
			var randIndex = getRandomNum(thisWord.viablePaths.length);
			var finalOrientation = thisWord.viablePaths[randIndex];
			thisWord.viablePaths = [];
			wordLocations[w] = {x: x, y: y, p: finalOrientation};

			setWordIntoMatrix(w, m, x, y, finalOrientation);
		}
	}
	
	function setWordIntoMatrix(w, m, x, y, p) {
		for (var k = 0, x, y; k < w.length; k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {
			m[x][y] = w.charAt(k); 
		}
		thisWord.wordFitted = true;
	}

	function doesOrientationFit(w, m, x, y, p) {
		var letterCount = 0;
		var wl = w.length;
		var ml = m.length;
		for (var k = 0, x, y; k < wl && bounds[p](x, y, ml); k++, x = incr[p](x, y).x, y = incr[p](x, y).y) {

			if (jQuery.isEmptyObject(m[x][y]) ||
				m[x][y] == w.charAt(k)) {
				letterCount++;
			}
		}

		if (letterCount == wl) {
			thisWord.viablePaths.push(p);
		}
	}

	function fillWithRandomLetters(matrix) {
		for (var i = 0; i < matrix.length; i++ ) {
			for (var j = 0; j < matrix[i].length; j++) {

				if (jQuery.isEmptyObject(matrix[i][j])) {
					matrix[i][j] = String.fromCharCode(65 + Math.random()*26);
				}
			}
		}
	}

	function remove(array, indexElement) {
		return array.filter(i => i !== indexElement);
	}

	function getRandomNum(bound) {
		return Math.floor(Math.random()*(bound));
	}
	
	function trimWord(word) {
		return word.replace(/\W/g, "");
	}

	this.getMatrix = function() {
		return board.matrix;
	}

	this.getWordLocations = function() {
		return wordLocations; 
	}
	
	this.getListOfWords = function() {
		return list;
	}
}
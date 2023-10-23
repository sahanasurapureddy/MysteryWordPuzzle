"use strict";


function MysterySearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {

	var searchTypes = {
		"Clemson Places!": [["Tillman Hall", "Sikes", "barre","freeman"],
			["bracket","business school","long hall","freeman hall"],
			["martin","lehotsky","coopers library","redfern"],
			["starbucks","55 exchange","fikes","hendrix"]],
		"Brands!": [["Coach", "BMW", "Michael Kors", "Nike"],
			["Crocs", "Zara", "Apple", "Microsoft"],
			["Ferrari", "Hoka", "Google", "Redbull"],
			["Puma", "Audi", "Kellogg", "Burger king","adidas"]],
		"States!": [["Kentucky", "Michigan", "Georgia", "Colorado"],
			["Florida", "Hawaii", "Illinois", "Kansas"],
			["Maryland", "Missouri", "Montana", "Arizona"],
			["California", "Ohio", "Texas", "Virginia"]],
		"Food": [["Sandwich", "Burger", "Pizza", "Coffee"],
			["Icecream", "Baked Potato", "Springroll", "Hashbrowns"],
			["FrenchFries", "Grilled Cheese", "Apple Pie", "Nachos"],
			["Burritos", "Lasagna", "Pasta", "Cupcake"]]
	};
	var game;
	var view;
	var mainInstructions = "Can You Find and Capture All the Hidden Words?";
	setUpWordSearch();

	function setUpWordSearch() {
		var searchTypesArray = Object.keys(searchTypes); 
		var randIndex = Math.floor(Math.random()*searchTypesArray.length); 
		var listOfWords = searchTypes[searchTypesArray[randIndex]]; 
		convertToUpperCase(listOfWords); 
		updateHeadings(mainInstructions, searchTypesArray[randIndex]);
		game = new MysterySearchLogic(gameId, listOfWords.slice());
		game.setUpGame();
		view = new MysterySearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId);
		view.setUpView();
		view.triggerMouseDrag();
	}

	function convertToUpperCase(wordList)  {
		for (var i = 0; i < wordList.length; i++) {
			for(var j = 0; j < wordList[i].length; j++) {
				wordList[i][j] = wordList[i][j].toUpperCase();
			}
		}
	}

	function updateHeadings(instructions, theme) {
		$(instructionsId).text(instructions);
		$(themeId).text(theme);
	}

	$(solveId).click(function() {
		view.solve(game.getWordLocations(), game.getMatrix());
	});

	$(newGameId).click(function() {

		$(gameId).empty();
		$(listId).empty();
		$(themeId).empty();
		setUpWordSearch();

	})
}

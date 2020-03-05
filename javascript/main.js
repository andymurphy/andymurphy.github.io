// check to see if the browser supports
// the addEventListener function
if(window.addEventListener)
{
	console.log('Browser supports event listener');
	window.addEventListener
	(
		'load', // this is the load event
		onLoad, // this is the event handler we are going to write
		false
	);
}

// Sets the text for the topic titles
function setTopicTitles(){
	console.log("Setting topic titles.");
	for (var i = 0; i < topics.length; i = i + 1){
		var topicTitle = document.getElementById(topics[i]);
		topicTitle.innerText = textObj[topics[i]].topicTitle;
	}
};

// Sets the text for the header which appears above the text of the questions
function setQuestionsHeader(){
	console.log("Setting questions header for " + topic);
	var header = document.getElementById("questionsHeader");
	header.innerText = textObj[topic].header;
	header.style.fontWeight = "bold";
};

// Sets the text for the questions in the questions div
function setQuestions(){
	console.log("Setting questions for " + topic);
	for(var i = 0; i < topics.length; i = i + 1){
		var elementId = "question" + (i + 1).toString(); // create the string needed to get the question element by its ID
		var question = document.getElementById(elementId);
		question.innerText = textObj[topic].questions[i];
	}
};

// Sets the topic text for the selected topic
function setTopicText(){
	console.log("Setting topic text for " + topic);
	var answer = document.getElementById("answer");
	answer.innerText = textObj[topic].topicInfo;
};
// Sets the image for the current topic
function setTopicImage(){	
	console.log("Setting topic image for " + topic);
	var infoImageDiv = document.getElementById("infoImage");
	infoImageDiv.src = textObj[topic].topicImageUrl;		
	// TODO I might want to set the image width here.
	// Only set the image width if the width of the img tag is less than what it would be if it was on a Raspberry Pi at 1920x1080 (HD)
	// Then I can look to see if the width of this is less than 960 and, if it is, scale the wisth of the image to be the same as the img tag (allowing for the padding and maybe margin as well)
};

// Sets the answer image when a question is selected
function setAnswerText(){
	var answer = document.getElementById("answer");	
	answer.innerText = textObj[topic]["answers"][question - 1];
};

// Sets the answer text when a question is selected
function setAnswerImage(){
	var answerImage = document.getElementById("infoImage");	
	// TODO I might want to set the image width here
	var imageWidthToFitScreen = (screenWidth / 2);
	console.log(imageWidthToFitScreen);
	answerImage.src = textObj[topic]["answerImages"][question - 1];
};

// Adds the event handlers for the topics and questions
function addEventHandlers(){
	// Topics
	var galleryTopicButton = document.getElementById("gallery");
	galleryTopicButton.addEventListener("click", function(){
		console.log("Gallery topic button clicked");
		topic = "gallery";
		setUpPageAfterTopicChange();
	}, false);
		
	var ferensTopicButton = document.getElementById("ferens");
	ferensTopicButton.addEventListener("click", function(){
		console.log("Ferens topic button clicked");
		topic = "ferens";
		setUpPageAfterTopicChange();
	}, false);
	
	var hullTopicButton = document.getElementById("hull");
	hullTopicButton.addEventListener("click", function(){
		console.log("Hull topic button clicked");
		topic = "hull";
		setUpPageAfterTopicChange();
	}, false);	
	
	// Questions
	var question1Button = document.getElementById("question1");
	question1Button.addEventListener("click", function(){
		console.log("Q1 button clicked");
		question = 1;
		setUpPageAfterQuestionChange();
	}, false);
	
	var question2Button = document.getElementById("question2");
	question2Button.addEventListener("click", function(){
		console.log("Q2 button clicked");
		question = 2;
		setUpPageAfterQuestionChange();
	}, false);
	
	var question3Button = document.getElementById("question3");
	question3Button.addEventListener("click", function(){
		console.log("Q3 button clicked");
		question = 3;
		setUpPageAfterQuestionChange();
	}, false);
}
// Sets up the page after a change of topic
function setUpPageAfterTopicChange(){
	setQuestionsHeader();
	setQuestions();
	setTopicText();
	makeCurrentTopicBold();
	setTopicImage();
	question = 0; // There is now no question selected 
	makeCurrentQuestionBold(); // This will change all the questions to not bold
};

function setUpPageAfterQuestionChange(){
	setAnswerImage();
	setAnswerText();
	makeCurrentQuestionBold();
	// Make the header not bold
	var header = document.getElementById("questionsHeader");
	header.style.fontWeight = "normal";
};
// Formats the topic buttons. The selected topic is made bold, the others are normal.
function makeCurrentTopicBold(){
	var i;
	for (i = 0; i < topics.length; i = i + 1){
		if (topics[i] == topic){
			var currentTopicText = document.getElementById(topic);				
			currentTopicText.style.fontWeight = "bold";
		} else {
			var topicText = document.getElementById(topics[i]);			
			topicText.style.fontWeight = "normal";
		}
	}
};
// Formats the questions. The selected question is made bold, the others are made normal.
function makeCurrentQuestionBold(){
	for (var i = 0 ; i < questions.length; i = i + 1){
		if(question == i + 1){
			var currentQuestionText = document.getElementById("question" + question.toString());
			currentQuestionText.style.fontWeight = "bold";
		} else {
			var questionText = document.getElementById("question" + (i + 1).toString());
			questionText.style.fontWeight = "normal";
		}
	}
};

function onLoad()
{
	console.log("Started \"OnLoad\".");
	topic = "gallery";
	console.log("Topic set to " + topic);
	logScreenDimensions();
	textObj = JSON.parse(textJSON);
	setTopicTitles();
	setQuestionsHeader(); 
	setQuestions();	
	setTopicText();	
	setTopicImage();
	makeCurrentTopicBold();
	addEventHandlers();
};

function logScreenDimensions(){
	screenWidth =  document.body.clientWidth; //window.innerWidth || document.documentElement.clientWidth
	screenHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
	console.log("Screen is " + screenWidth.toString() + " x " + screenHeight.toString());
	
}

// I wonder about using objects to represent the topics.
// So each topic could be created as an object and populated with information from the JSON file.

var topic = ""; // The current topic
var topics = ["gallery", "ferens", "hull"]; // The possible topics
var question = 0; // The current question
var questions = [1,2,3]; // The possible questions
var textObj; // Stores the text as a JSON

var screenWidth;
var screenHeight;
  //initialize firebase get info from firebase website server
   var config = {
    apiKey: "AIzaSyC5w0CwVnhxt3sk2aO6zHArtBHB7KLFl2U",
    authDomain: "trainscheduler-52dc1.firebaseapp.com",
    databaseURL: "https://trainscheduler-52dc1.firebaseio.com",
    projectId: "trainscheduler-52dc1",
    storageBucket: "trainscheduler-52dc1.appspot.com",
    messagingSenderId: "741795464165"
  };

  firebase.initializeApp(config);
//make the firebase var
  var database = firebase.database();

//gloabal variables to be used the entire script
  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = 0;
  var nextArrival = "";
  var minutesAway = 0;
//on click event when user submits their info
$("#addTrainButton").on("click", function(event) {
  event.preventDefault();

//take the information user is submitting in the inputs
	  var trainName = $("#train-name").val().trim();
	  var destination = $("#destination").val().trim();
	  //store it as time with HH:mm
	  var trainTime = moment($("#first-train-time").val().trim(), "HH:mm").format("X");
	  var frequency = $("#frequency").val().trim();
//create a new variable on DOM consisting of the user inputted info
	    var newTrain = {
		    train: trainName,
		    destination: destination,
		    firstTrainTime: trainTime,
		    frequency: frequency
		  };
//put new train var in firebase
	database.ref().push(newTrain);

	  console.log(newTrain.train);
	  console.log(newTrain.destination);
	  console.log(newTrain.firstTrainTime);
	  console.log(newTrain.frequency);

	  //clearing the inputs after the info is submitted
	$("#train-name").val("");
	$("#destination").val("");
	$("#first-train-time").val("");
  	$("#frequency").val("");

});
//example taken from saturday class
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable from firebase server
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  var timeDifference = moment().diff(moment.unix(trainTime), "minutes");
  //calculate remainder from time difference
  var remainder = timeDifference % frequency;
  //when the next train will be arriving
  var arrivalTime = frequency - remainder;
  //show that time as HHmm 
  var nextTrain = moment().add(arrivalTime, "m").format("hh:mm A");

  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);


  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrain + "</td><td>" + arrivalTime + "</td><td>");
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQIDIJI1JXDWxOqm4Bw8mMVca5GbqFLxg",
    authDomain: "train-8f18e.firebaseapp.com",
    databaseURL: "https://train-8f18e.firebaseio.com",
    projectId: "train-8f18e",
    storageBucket: "",
    messagingSenderId: "551230644070"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Create new train on button click
  $("#add-train-btn").on("click", function(event){
    event.preventDefault();

//Grab user inputs
    var trainName = $("#train-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFreq = $("#min-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        train: trainName,
        destination: trainDest,
        firstTime: trainTime,
        frequency: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTime);
        console.log(newTrain.frequency);

  alert("Train schedule successfully added");

  // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
  });

  //Create firebase event to push train schedule to database and to append to html
    database.ref().on("child_added", function(childSnapshot){
        var trainName = childSnapshot.val().train;
        var trainDest = childSnapshot.val().destination;
        var trainTime = childSnapshot.val().firstTime;
        var trainFreq = childSnapshot.val().frequency;

//console log train info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainTime);
        console.log(trainFreq);

//Look at this tomorrow
        var tFirstTime = trainTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(tFirstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);
    
        // Minute Until Train
        var minAway = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minAway);
    
        // Next Train
        var nextTrain = moment().add(minAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var nextT = moment(nextTrain).format("dddd, MMM DD, hh:mm a");


//Create new table row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(nextT),
        $("<td>").text(minAway)

    );

    $("#train-table").append(newRow);

    });
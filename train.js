//base firebase config info for usage
var config = {
   apiKey: "AIzaSyBiQwekcoI4zERqhj46b6LskL_c7PnqbAc",
   authDomain: "train-time-6dad6.firebaseapp.com",
   databaseURL: "https://train-time-6dad6.firebaseio.com",
   projectId: "train-time-6dad6",
   storageBucket: "train-time-6dad6.appspot.com",
   messagingSenderId: "490979657912"
 };
 firebase.initializeApp(config);
//set variable for databse 
var database = firebase.database();
//on click of submit to grab user input fields and submit to firebase
$(document).on("click", "button", function () {
    //event prevent default will keep the page from reloading and losing the information already stored from the db
    event.preventDefault();
 //jquery varibles to capture the specified form fields
    var trainName = $("#train-name").val().trim()
    var destInput = $("#destination").val().trim()
    var trainTime = $("#train-time").val().trim()
    var trainFreq = $("#train-freq").val().trim()
 //object created to store the captured information that will be pushed to the database   
    var newTrain = {
        //use a different name for the jquery caputure which be the value, from the key that will be stored in the db
        name: trainName,
        destination: destInput,
        time: trainTime,
        frequency: trainFreq,
}
//will push this newly captured information into the database, this needs to be inside the click function
//at this point we are completed with pushing our information to the database
//see the next database ref call that will be used to populate the DOM via jQuery with live data from the server
database.ref().push(newTrain);
});
//firebase db config to capture the existing items in the database
database.ref().on("child_added", function (childsnapshot) {
//create variables to grab the databse values for load into the dom
    var dbTrain = childsnapshot.val().name;
    var dbDest = childsnapshot.val().destination;
    var dbTime = childsnapshot.val().time;
    var dbFreq= childsnapshot.val().frequency;
    //calculations will be done in the app and not stored on the db to save space

    // Now:
    var currenttime = moment();
   console.log("Now TIME: " + currenttime)

    //Take a look at activity 21 train predictions create momentFreq to hold the date we are using to calculate and then specify it's format
  
    //  Minutes to arrival:
   var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes')
   // Frequency (min)
   var minuteLast = minuteArrival % frequency;
   var trainAway = frequency - minuteLast;
   //  Next arrival
   var nextArrival = currenttime.add(trainAway, 'minutes');
   var arrivaltime = nextArrival.format("HH:mm");
   
   //jquery variables for ease of use to append and create a new row with the captured data from the database
    var tBody = $("tbody");
    var tRow = $("<tr>")
    var trainTd = $("<td>").text(dbTrain)
    var destTd = $("<td>").text(dbDest)
    var timeTd = $("<td>").text(dbTime)
    var freqTd = $("<td>").text(dbFreq)
   
   //create a new row append the data valaues from the db
    tRow.append(trainTd, destTd, timeTd, freqTd, arrivaltime);
    //append the newly created row to the body of table
    tBody.append(tRow);
    
   }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
// $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + trainAway + "</td>");
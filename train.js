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
 console.log(firebase)
//set variable for databse 
var database = firebase.database();
// train variables
var trainName = "";
var destination = "";
var time = "";
var frequency = "";

//on click of submit to grab user input fields and submit to firebase
$('#new-train').on("click", "button", function () {
    //event prevent default will keep the page from reloading and losing the information already stored from the db
    event.preventDefault();
    console.log('clicked')
 //jquery varibles to capture the specified form fields
    trainName = $("#train-name").val().trim()
    destination = $("#destination").val().trim()
    trainTime = $("#train-time").val().trim()
    trainFreq = $("#train-freq").val().trim()
 //object created to store the captured information that will be pushed to the database   
    var newTrain = {
   //use a different name for the jquery caputure which be the value, from the key that will be stored in the db
        trainName: trainName,
        destination: destination,
        traintime: trainTime,
        trainfrequency: trainFreq,
}
//will push this newly captured information into the database, this needs to be inside the click function
//at this point we are completed with pushing our information to the database
//see the next database ref call that will be used to populate the DOM via jQuery with live data from the server
database.ref().push(newTrain);
});
// console.log(database)
//firebase db config to capture the existing items in the database
database.ref().on("child_added", function (childsnapshot) {
//create variables to grab the databse values for load into the dom
    var dbTrain = childsnapshot.val().trainName;
    var dbDest = childsnapshot.val().destination;
    var dbTime = childsnapshot.val().trainTime;
    var dbFreq= childsnapshot.val().frequency;
    //calculations will be done in the app and not stored on the db to save space

    // Now:
    var currentTime = moment();
      console.log("Now TIME: " + currentTime)
    var tfrequency = parseInt(tfrequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Minutes Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

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
    
// $("#new-train").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + trainAway + "</td>");
})
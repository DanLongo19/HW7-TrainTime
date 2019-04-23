//base firebase config info for usage
var config = {
    apiKey: "AIzaSyBR61jxhgBVZQJLC0x7D9CkTUJnT4DbBGE",
    authDomain: "fir-practice-227fb.firebaseapp.com",
    databaseURL: "https://fir-practice-227fb.firebaseio.com",
    projectId: "fir-practice-227fb",
    storageBucket: "fir-practice-227fb.appspot.com",
    messagingSenderId: "344231653528"
};
//initialize firebase
firebase.initializeApp(config);
//set variable for databse 
var database = firebase.database();
//on click of submit to grab user input fields and submit to firebase
$(document).on("click", "button", function () {
    //event prevent default will keep the page from reloading and losing the information already stored from the db
    event.preventDefault();
 //jquery varibles to capture the specified form fields
    var empName = $("#emp-name").val().trim()
    var empRole = $("#emp-role").val().trim()
    var empStart = $("#emp-start").val().trim()
    var empRate = $("#emp-rate").val().trim()
 //object created to store the captured information that will be pushed to the database   
    var newEmp = {
        //use a different name for the jquery caputure which be the value, from the key that will be stored in the db
        name: empName,
        role: empRole,
        start: empStart,
        rate: empRate,
}
//will push this newly captured information into the databse, this needs to be inside the click function
//at this point we are complted with pushing our information to the database
//see the next databse ref call that will be used to populate the DOM via jQuery with live data from the server
database.ref().push(newEmp);
});
//firebase db config to capture the existing items in the database
database.ref().on("child_added", function (childsnapshot) {
//create variables to grab the databse values for load into the dom
    var dbName = childsnapshot.val().name;
    var dbRole = childsnapshot.val().role;
    var dbStart = childsnapshot.val().start;
    var dbRate = childsnapshot.val().rate;
    //calculations will be done in the app and not stored on the db to save space
    //create momentInst to hold the date we are using to calculate and then specify it's format
    var momentIsnt = moment(dbStart, "MM/DD/YYYY")
    //calculate the month worked using diff- review moment.js
    var monthsWorked = momentIsnt.diff(moment(), 'months') * -1;
    //calculate the total billed
    var totalBilled = monthsWorked * dbRate;
   
   //jquery variables for ease of use to append and create a new row with the captured data from the database
    var tBody = $("tbody");
    var tRow = $("<tr>")
    var nameTd = $("<td>").text(dbName)
    var roleTd = $("<td>").text(dbRole)
    var startTd = $("<td>").text(dbStart)
    var mnthsTD = $("<td>").text(monthsWorked)
    var rateTd = $("<td>").text(dbRate)
    var billedTd = $("<td>").text(totalBilled)
    //create a new row append the data valaues from the db
    tRow.append(nameTd, roleTd, startTd, mnthsTD, rateTd, billedTd);
    //append the newly created row to the body of table
    tBody.append(tRow);
      
      
    })
// Variables which will store and loop through my schedule
var myDay = [
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "1",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "2",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "3",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "4",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "5",
        meridiem: "pm",
        reminder: ""
    },

]



// Adds the current date and time to the header
function headerDate() {
    var currentHeaderDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(currentHeaderDate);
}
headerDate();

// Will store data into localStorage
function saveReminder() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}


// Will display any data in localStorage
function displayReminder() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// Allows existing localStorage date to display
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));
    if (storedDay) {
        myDay = storedDay;
    }
    saveReminder();
    displayReminder();
}

// Displays scheduler
myDay.forEach (function (thisHour) {
    // Generate time blocks row
    hourRow = $("<form>").attribute({
        "class": "row"
    });
    $(".container").append(hourRow);


    // Generate the time field
    var hourField = $("<div>")
    .text (`${thisHour.hour}${thisHour.meridiem}`)
    .attribute({
        "class": "col-md-2 hour"
    });

    // Will generate the schedule data
    var hourPlan = $("<div>")
        .attribute({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attribute("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attribute ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attribute({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attribute({
            "class": "future"
        })
    }

    // Creates the save buttons
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

init();


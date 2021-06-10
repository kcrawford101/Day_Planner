// Variables which will store and loop through my schedule
var myDay = [
    {
        id: "1",
        hour: "9",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "11",
        time: "11",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "9",
        hour: "5",
        time: "17",
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
    hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);


    // Generate the time field
    var hourField = $("<div>")
    .text (`${thisHour.hour}${thisHour.meridiem}`)
    .attr({
        "class": "col-md-2 hour"
    });

    // Will generate the schedule data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
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

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})

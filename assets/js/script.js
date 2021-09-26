// Document variables
var timeblockEl = $("#container");
var dateDisplayEl = $("#currentDay");
var saveBtn = $("button.saveBtn.rounded-right");

// Time variables and corresponding ids
var idsCollection = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4", "#5"];
var timeSlotCollection = [
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
];
var shiftedTimeSlotCollection = [
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
];

// Timeblock text - corresponding variables
var plannerContent = [];
var getLocalStorageData = JSON.parse(localStorage.getItem("planner-items"));

// If local storage data does not equal 0...
if (getLocalStorageData !== null) {
  plannerContent = getLocalStorageData;
}

// handle displaying the time
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(rightNow);
}
displayTime();

// Past, present or future
for (var i = 0; i < idsCollection.length; i++) {
  var descriptionEl = $(idsCollection[i]);
  var buttonEl = descriptionEl.parent().parent().find("button");

  // Future timeblock(s)
  if (
    moment().format("MMMM Do YYYY, HH:mm:ss") <
    moment().format("MMMM Do YYYY") + ", " + timeSlotCollection[i]
  ) {
    descriptionEl.addClass("future");
    plannerContent.forEach(function (item) {
      if (idsCollection[i] === "#" + item["input-id"]) {
        descriptionEl.val(item["input-value"]);
      }
    });
    // Present timeblock - disable save button
  } else if (
    moment().format("MMMM Do YYYY, HH:mm:ss") >=
      moment().format("MMMM Do YYYY") + ", " + timeSlotCollection[i] &&
    moment().format("MMMM Do YYYY, HH:mm:ss") <
      moment().format("MMMM Do YYYY") + ", " + shiftedTimeSlotCollection[i]
  ) {
    descriptionEl.addClass("present");
    $(".present").attr("disabled", "disabled");
    buttonEl.attr("disabled", true);
    plannerContent.forEach(function (item) {
      if (idsCollection[i] === "#" + item["input-id"]) {
        descriptionEl.val(item["input-value"]);
      }
    });
    // Past timeblock
  } else if (
    moment().format("MMMM Do YYYY, HH:mm:ss") >
    moment().format("MMMM Do YYYY") + ", " + timeSlotCollection[i]
  ) {
    descriptionEl.addClass("past");
    $(".past").attr("disabled", "disabled");
    buttonEl.attr("disabled", true);
  }
}

// Save button saves text to local storage
saveBtn.on("click", function (event) {
  event.preventDefault();
  var container = $(this).parent().parent();
  var inputValue = container.find("textarea").val();
  var inputId = container.find("textarea").attr("id");
  var textObj = {
    "input-id": inputId,
    "input-value": inputValue,
  };

  if (textObj["input-value"] !== "") {
    plannerContent.push(textObj);
    localStorage.setItem("planner-items", JSON.stringify(plannerContent));
  }
});

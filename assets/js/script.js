// variables
var timeblockEl = $("#container");
var dateDisplayEl = $("#currentDay");
var saveBtn = $("button.saveBtn.rounded-right");

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

// When website is loaded, display saved information from previous session, called from local storage
function init() {
  localStorage.getItem("planner-items");
  // Do I have to use every time (only have 9 for now) in order to call the stored data?
  $("#9").textContent = "plannerContent";
}
init();

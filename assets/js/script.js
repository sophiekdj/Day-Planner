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

function init() {
  localStorage.getItem("planner-items");
  $("#9").textContent = "plannerContent";
}
init();

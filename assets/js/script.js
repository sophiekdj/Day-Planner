var timeblockEl = $("#container");
var dateDisplayEl = $("#currentDay");

// handle displaying the time
function displayTime() {
  var rightNow = moment().format("dddd, MMMM Do");
  dateDisplayEl.text(rightNow);
}
displayTime();

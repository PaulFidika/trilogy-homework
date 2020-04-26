const businessDayStart = 9;
const businessHours = 10;
let now = moment(); // .format("MMMM Do YYYY");

// allows you to move the calendar into the future or into the past. The default value is today
$("#back").on("click", function (event) {
    event.preventDefault();
    now.add(-1, 'day');
    setCurrentDate();
});

$("#forward").on("click", function (event) {
    event.preventDefault();
    now.add(1, 'day');
    setCurrentDate();
});

// Populate the page with time-blocks
function initializeCalendar() {
    for (i = 0; i < businessHours; i++) {
        let codeBlock = "<div id='row" + i + "' class='row'>" +
            "<form class='col s12'>" +
            "<div class='row'>" +
            "<div class='input-field col s6'>" +
            "<i id='icon" + i + "' class='material-icons prefix'>today</i>" +
            "<textarea id='icon_prefix" + i + "' class='materialize-textarea'></textarea>" +
            "<label id='label_prefix" + i + "' for='icon_prefix" + i + "'>" + formatTime(businessDayStart + i) + "</label>" +
            "</div></div></form></div>";

        $("#schedule").append(codeBlock);

        $("#icon_prefix" + i)
            .attr("data-hour", i)
            .on("input", function (event) {
                setMemory(parseInt(event.target.getAttribute("data-hour")) + businessDayStart, event.target.value);
            });
    }

    setCurrentDate();
    markupDay();
}

// Updates the date displayed in the header to the date set in the 'now' variable, then updates the content in the timeblocks from memory, then marks up the current day
function setCurrentDate() {
    $("#currentDay").html(now.format("MMMM Do YYYY"));

    for (i = 0; i < businessHours; i++) {
        let content = getMemory(businessDayStart + i);
        $("#icon_prefix" + i).val(content)

        if (content) {
            $("#label_prefix" + i).attr("class", 'active');
        } else {
            $("#label_prefix" + i).attr("class", '');
        }
    }

    markupDay();
}

// Takes an integer = the hour of the day, from 0 to 24, and then returns a string with the correct formatting
function formatTime(hour) {
    if (hour < 12) {
        return hour + 'am';
    } else if (hour == 12) {
        return 'Noon';
    } else {
        return hour - 12 + 'pm';
    }
}

// retrieves items from local storage
function getMemory(hour) {
    return localStorage.getItem(now.format("MMMM Do YYYY") + hour);
}

// saves items in local storage
function setMemory(hour, item) {
    console.log(hour, item);
    localStorage.setItem(now.format("MMMM Do YYYY") + hour, item);
}

// changes the styling of the fields to correspond to the time of day
function markupDay() {
    const t = moment();
    console.log(t.hours());

    if (t.format("MMMM Do YYYY") == now.format("MMMM Do YYYY")) { // displayed date is current date
        for (i = 0; i < businessHours; i++) {
            if (t.hours() == (businessDayStart + i)) { // current time
                $('#icon' + i).html('chevron_right');
                $('#icon_prefix' + i).addClass('now').removeClass('passed future');
            } else if (t.hours() > (businessDayStart + i)) { // the time has passed
                $('#icon' + i).html('check_circle');
                $('#icon_prefix' + i).addClass('passed').removeClass('now future');
            } else { // future time
                $('#icon' + i).html('filter_center_focus');
                $('#icon_prefix' + i).addClass('future').removeClass('now passed');
            }
        }
    } else if (t > now) { // displayed date is a past date
        for (i = 0; i < businessHours; i++) {
            $('#icon' + i).html('check_circle');
            $('#icon_prefix' + i).addClass('passed').removeClass('now future');
        }
    } else { // displayed date is a future date
        for (i = 0; i < businessHours; i++) {
            $('#icon' + i).html('filter_center_focus');
            $('#icon_prefix' + i).addClass('future').removeClass('now passed');
        }
    }
}

$(document).ready(initializeCalendar);
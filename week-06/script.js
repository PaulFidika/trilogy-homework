const APIKey = "66e868641d67af9138a316104bbcbd49";
const temps_max = [];
const temps_min = [];
const forecast = [];
const icon = [];

$('#search-button').on('click', search);

function search() {
    event.preventDefault();
    let cityName = $("#search-input").val().trim();

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=5&appid=" + APIKey,
        type: "GET",
        dataType: 'json',
        success: populateWeather
    })

    saveCityName(cityName);
    updateSavedCities();
};

// parse the weather data recieved from the API
function populateWeather(response) {
    let now = moment(); // .format("MMMM Do YYYY"); figure out today's date using the moment library

    for (i = 0; i < 5; i++) {
        temps_max[i] = convertKToF(response.list[i].temp.max);
        temps_min[i] = convertKToF(response.list[i].temp.min);
        forecast[i] = response.list[i].weather[0].description;
        forecast[i] = forecast[i].charAt(0).toUpperCase() + forecast[i].slice(1).toLowerCase();
        icon[i] = response.list[i].weather[0].icon;
    }

    $("#forecast").empty();

    for (i = 0; i < 5; i++) {
        let day = $("<div class='card col-sm-4'>")
        let header = $("<h5 class='card-header'>").html(now.format("dddd MMMM Do"));
        let body = $('<div class="card-body">');
        let li0 = $("<div>").html("<img src='http://openweathermap.org/img/wn/" + icon[i] + "@2x.png'>")
        let li1 = $("<div>").html("<b>" + forecast[i] + "</b>");
        let li2 = $("<div>").html("Day's High: " + temps_max[i]);
        let li3 = $("<div>").html("Day's Low: " + temps_min[i]);

        body.append(li0, li1, li2, li3);
        day.append(header, body);
        $("#forecast").append(day);

        now.add(1, 'day'); // increment the day by 1for the next item in the loop
    }

};

// converts units of temperature
function convertKToF(k) {
    return Math.round(((k - 273.15) * 1.8) + 32);
}


// This stores a list of the last 5 cities that you searched
function saveCityName(cityName) {
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    cityName[0] = cityName[0].toUpperCase(); // make sure the first letter is upper case
    let a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];

    for (i = 0; i < 5; i++) { // make sure we don't have any duplicates in the most recent 5
        if (a[i] == cityName) delete a[i];
    }

    a.unshift(cityName);
    localStorage.setItem('session', JSON.stringify(a));
}


// this pdates the saved cities div so that it's current
function updateSavedCities() {
    let a = [];
    a = JSON.parse(localStorage.getItem('session')) || [];
    $("#search-history").empty()
        .html('<b>Search History:</b>&nbsp;');

    for (i = 0; i < 5; i++) {
        $("#search-history").append('<span id="' + i + '"data-id="' + a[i] + '">' + a[i] + ',&nbsp;</span>');

        $("#" + i).on('click', function (event) {
            event.preventDefault();
            console.log(this);
            $("#search-input").val(this.dataset.id);
            search();
        });
    }
}

updateSavedCities(); // initialize the saved cities div
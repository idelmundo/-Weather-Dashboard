// API key 
var APIKey = "e8baafedb4333fd54c93edc9a7b634f4";
//event button listener
$("#button").click(function(event) {
    event.preventDefault();
    newCity = $("#text").val().trim();
    console.log(newCity);
    // clear local storage
    localStorage.clear();
    // store content into localStorage
    localStorage.setItem("newCity", newCity);
    getfiveDayForcast(newCity)
    var wHistory = JSON.parse(localStorage.getItem("wHistory")) || []
    wHistory.push(newCity)
    localStorage.setItem("wHistory", JSON.stringify(wHistory))




    // Ajax and search begins
    const quaryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
        url: quaryURL,
        method: "GET"
    }).then(function(response) {
        // log the queryURL
        // console.log(quaryURL);
        // log the result object 
        console.log(response);
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        var windSpeed = response.wind.speed;
        $(".wind").html("Wind Speed:" + windSpeed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        // get icon for weather condition
        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        $(".icon").append($("<img>").attr("src", iconURL))
        getUV(response.coord.lon, response.coord.lat)
    })

    function getUV(longitude, latitude) {
        var quaryurlUVIndex = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
        $.ajax({
            url: quaryurlUVIndex,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $(".longitude").text("longitude:" + response[0].lon);
            $(".latitude").text("latitude:" + response[0].lat);
        })
    }
    //fiveday forcast begins 
    function getfiveDayForcast(city) {
        var quaryfiveDayFor = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;
        $.ajax({
            url: quaryfiveDayFor,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            for (var i = 0; i < 5; i++) {
                var card = $("<div>").addClass("card");
                var wdate = $("<p>").addClass("title").text(new Date(response.list[i].dt_txt).toLocaleDateString())
                var wimage = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png")
                var wtemp = $("<p>").addClass("title").text(response.list[i].main.temp_max + "F")
                var whumid = $("<p>").addClass("title").text(response.list[i].main.humidity + "%")
                card.append(wdate, wimage, wtemp, whumid)
                $(".fiveDayForcast").append(card)
            }
        })
    }

})
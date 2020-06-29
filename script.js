// API key 
var APIKey = "e8baafedb4333fd54c93edc9a7b634f4";
$("#button").click(function(event) {
    event.preventDefault();
    newCity = $("#text").val().trim();
    console.log(newCity);


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
        $(".wind").html("<p>Wind Speed: " + windSpeed + "</p>");
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + response.main.temp);
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);

    })

})
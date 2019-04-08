var seriesArray = ["Game of Thrones", "Borgia", "The Office", "Friends", "Narcos", "Mr. Robot", "House of Cards", "Downtown Abbey"];

//function alertSeriesName() {

//}

function addButtons () {
    $("#buttons").empty();
    for (var i = 0; i < seriesArray.length; i++) {
        var a = $("<button>");
        a.addClass("series");
        a.attr("data-series", seriesArray[i]);
        a.text(seriesArray[i]);
        $("#buttons").append(a);
    }
}

//$(document).on("click", ".series", alertSeriesName);

addButtons();

$("button").on("click", function () {
    var series = $(this).attr("data-series");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${series}&api_key=97ebs16m5vS9zuQHeeA1HUmZQdigPkwi&limit=10`;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text(`Rating: ${rating}`);
                var seriesImage = $("<img>");
                seriesImage.attr("src", results[i].images['480w_still'].url);
                gifDiv.append(p);
                gifDiv.append(seriesImage);

                $("#div-for-gifs").prepend(gifDiv);
            }
        }
    
    })
})

$("#add-series").on("click", function(event) {
    event.preventDefault();
    var newSeries = $("#series-input").val().trim();
    seriesArray.push(newSeries);
    addButtons();
    $("#series-input").val('');
});
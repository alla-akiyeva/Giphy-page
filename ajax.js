var seriesArray = ["Game of Thrones", "The Borgias", "The Office", "Friends", "Narcos", "Mr. Robot", "House of Cards", "Downtown Abbey", "Sherlock Holmes"];

//function alertSeriesName() {

//}

// This function loops through the series array and creates buttons for each item.
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

let offset = 0;

// On-click listener for buttons triggers ajax query to GIPHY API and populates the page with images. 
$(document).on("click", ".series", function () {
    var series = $(this).attr("data-series");
    
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${series}&api_key=97ebs16m5vS9zuQHeeA1HUmZQdigPkwi&limit=10&offset=${offset}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        console.log(response);
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // var gifDiv = $("<div class='image'>");
                // var rating = results[i].rating;
                // var p = $("<p>").text(`Rating: ${rating}`);
                var seriesImage = $("<img>");
                seriesImage.attr("src", results[i].images['480w_still'].url);
                seriesImage.attr("data-still", results[i].images['480w_still'].url);
                seriesImage.attr("data-animate", results[i].images['fixed_height'].url);

                // gifDiv.append(p);
                // gifDiv.append(seriesImage);
                // $("#div-for-gifs").prepend(gifDiv);  

                // -- Commented out the appending of a "rating" <p> to simplify the image element for styling purposes. 

                $("#div-for-gifs").prepend(seriesImage);
            }
        }
        offset = offset + 10;
    })
})

$(document).on("click", "img", function() {
  var src = $(this).attr("src");
  var still = $(this).attr("data-still");
  var animate = $(this).attr("data-animate");
  if (src == still) {
    $(this).attr("src", animate);
  } else {
    $(this).attr("src", still);
  }
})

$("#clear").on("click", function () {
    $("#div-for-gifs").empty();
})

// This function adds a new button to the page when User enters text (series name) and hits "Add".
$("#add-series").on("click", function(event) {
    event.preventDefault();
    var newSeries = $("#series-input").val().trim();
    seriesArray.push(newSeries);
    addButtons();
    $("#series-input").val('');
});
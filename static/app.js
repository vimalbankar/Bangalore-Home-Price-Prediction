function onpageload() {
    console.log("document loaded");

    var url = "http://127.0.0.1:5000/get_location_names/";

    $.get(url, function (data, status) {
        console.log("got response for get_location_names");

        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();

            for (var i = 0; i < locations.length; i++) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onpageload;


function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("uiSqft").value;
    var location = document.getElementById("uiLocations").value;

    var bhk = document.querySelector('input[name="uiBHK"]:checked').value;
    var bath = document.querySelector('input[name="uiBathrooms"]:checked').value;

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            total_sqft: sqft,
            location_name: location,
            bhk: bhk,
            bath: bath
        }),
        success: function (data) {
            document.getElementById("uiEstimatedPrice").innerHTML =
                "<h2>₹ " + data.estimated_price + " Lakhs</h2>";
        },
        error: function (err) {
            console.log(err);
            alert("Error calculating price");
        }
    });
}

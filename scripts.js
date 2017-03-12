(function() {
    loadJSON(function(response) {
        // Parse JSON string into object
        var colourData = JSON.parse(response);
        $('.go').on('click', function() {
            var capacity = parseInt($('.input-capacity select').val()),
                number = parseInt($('.input-number input').val()),
                result;

            console.log('capacity', capacity);
            console.log('number', number);

            if (!number || number == '0' || number === 0) {
                alert("Enter a number");
            }
            else if (capacity < number) {
                alert("The number can't be bigger than the capacity");
            }
            else {
                result = filterColours(colourData, capacity, number);
                if (result) {
                    $(this).hide();
                    loadResult(result);
                }
            }
        });
        $('.inputs').on('keypress', 'input', function() {
            clearResults();
        }).on('change', 'select', function() {
            clearResults();
        });;
    });
})();


function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function filterColours(colourData, capacity, number) {
    var filterObj = colourData.filter(function(e) {
        return e.capacity == capacity && e.number == number;
    });
    if (!filterObj.length) {
        return null;

    }
    return filterObj[0];
}

function loadResult(result) {
    $('#tube').removeClass().addClass('colour-' + result.tube);
    $('#fiber').removeClass().addClass('colour-' + result.fiber);
    $('#tube-stripe').removeClass().addClass('stripes stripes-' + result.tube_stripe);
    $('#fiber-stripe').removeClass().addClass('stripes stripes-' + result.fiber_stripe);

    $('#tube-colour .colour-name').text(result.tube);
    $('#fiber-colour .colour-name').text(result.fiber);
    if (result.tube_stripe) {
        $('#tube-colour .colour-stripe').text(result.tube_stripe + " stripe");
    }
    else {
        $('#tube-colour .colour-stripe').text('');
    }
    if (result.fiber_stripe) {
        $('#fiber-colour .colour-stripe').text(result.fiber_stripe + " stripe");
    }
    else {
        $('#fiber-colour .colour-stripe').text('');
    }

}

function clearResults() {
    $('.go').show();
    $('#tube-colour .colour-name').text('');
    $('#fiber-colour .colour-name').text('');
    $('#tube-colour .colour-stripe').text('');
    $('#fiber-colour .colour-stripe').text('');
}

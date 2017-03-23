(function() {
    // all the elements
    const go = document.body.querySelector('.go')
    const tube = document.body.querySelector('#tube');
    const fiber = document.body.querySelector('#fiber');
    const tubeStripe = document.body.querySelector('#tube-stripe');
    const fiberStripe = document.body.querySelector('#fiber-stripe');
    const tubeColourText = document.body.querySelector('#tube-colour .colour-name');
    const fiberColourText = document.body.querySelector('#fiber-colour .colour-name');
    const tubeStripeText = document.body.querySelector('#tube-colour .colour-stripe');
    const fiberStripeText = document.body.querySelector('#fiber-colour .colour-stripe');
    
    
    // getting the data object with all the numbers in it
    loadJSON(function(response) {
        // Parse JSON string into object
        var colourData = JSON.parse(response);
        go.addEventListener('click', function() {
            var capacity = parseInt(document.body.querySelector('.input-capacity select').value),
                number = parseInt(document.body.querySelector('.input-number input').value),
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
                    this.style.display = 'none';
                    loadResult(result);
                }
            }
        });
        inputs = document.body.querySelectorAll('.inputs');
        inputs.forEach(function(el) {
            el.addEventListener('click', function() {
                clearResults();
            });
        });
    });
    
    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'data.json', true); 
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
        tube.classList = 'colour-' + result.tube;
        fiber.classList = 'colour-' + result.fiber;
        tubeStripe.classList = 'stripes stripes-' + result.tube_stripe;
        fiberStripe.classList = 'stripes stripes-' + result.fiber_stripe;
    
        tubeColourText.textContent = result.tube;
        fiberColourText.textContent = result.fiber;
        if (result.tube_stripe) {
            tubeStripeText.textContent = result.tube_stripe + " stripe";
        }
        else {
            tubeStripeText.textContent = '';
        }
        if (result.fiber_stripe) {
            fiberStripeText.textContent = result.fiber_stripe + " stripe";
        }
        else {
            fiberStripeText.textContent = '';
        }
    
    }
    
    function clearResults() {
        go.style.display = 'block';
        tubeColourText.textContent = '';
        tubeStripeText.textContent = '';
        fiberColourText.textContent = '';
        fiberStripeText.textContent = '';
    }
    
    
})();




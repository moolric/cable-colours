(function() {

//const QSelect = (selector) => document.body.querySelector(selector)

const UI = {
    go: QSelect('.go'),
    tube: QSelect('#tube'),
    fiber: QSelect('#fiber'),
    tubeStripe: QSelect('#tube-stripe'),
    fiberStripe: QSelect('#fiber-stripe'),
    tubeColourText: QSelect('#tube-colour .colour-name'),
    fiberColourText: QSelect('#fiber-colour .colour-name'),
    tubeStripeText: QSelect('#tube-colour .colour-stripe'),
    fiberStripeText: QSelect('#fiber-colour .colour-stripe'),
    capacityInput: QSelect('.input-capacity select'),
    numberInput: QSelect('.input-number input')

}

    
    // getting the data object with all the numbers in it
    loadJSON(function(response) {
        // Parse JSON string into object
        var colourData = JSON.parse(response);
        UI.go.addEventListener('click', function() {
            var capacity = parseInt(UI.capacityInput.value),
                number = parseInt(UI.numberInput.value),
                result;

            console.log('capacity', capacity);
            console.log('number', number);

            if (!number || number == '0' || number == 0) {
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
            } else {                
                // TODO handle error
            }
        };
        xobj.send(null);
    }
    
    function filterColours(colourData, capacity, number) {
        var filterObj = colourData.filter(function(e) {
            return e.capacity == capacity && e.number == number;
        });
        return filterObj[0];
    }
    
    function loadResult(result) {
        UI.tube.classList = 'colour-' + result.tube;
        UI.fiber.classList = 'colour-' + result.fiber;
        UI.tubeStripe.classList = 'stripes stripes-' + result.tube_stripe;
        UI.fiberStripe.classList = 'stripes stripes-' + result.fiber_stripe;
    
        UI.tubeColourText.textContent = result.tube;
        UI.fiberColourText.textContent = result.fiber;
        
        UI.tubeStripeText.textContent = result.tube_stripe ? result.tube_stripe + ' stripe' : '';
        UI.fiberStripeText.textContent = result.fiber_stripe ? result.fiber_stripe + ' stripe' : '';
    
    }
    
    function clearResults() {
        UI.go.style.display = 'block';
        UI.tubeColourText.textContent = '';
        UI.tubeStripeText.textContent = '';
        UI.fiberColourText.textContent = '';
        UI.fiberStripeText.textContent = '';
    }
    
    
})();




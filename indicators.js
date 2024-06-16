// indicators.js - Get the list of indicators from `characters.json`

function getIndicators() {
    /*
    What I want to do:
    - Fetch the JSON from `characters.json`
    - Loop through the `characters` objects for each group (discard the group names)
    - Store each of the characters' names along with their indicators in an array
    - Return an array of [characterName: string, indicator: string, indicatorName: string]
    */

    let indicators = [];

    // Synchronous XMLHttpRequest to fetch JSON (this will block execution until done)
    let request = new XMLHttpRequest();
    request.open('GET', 'characters.json', false);  // false makes the request synchronous
    request.send(null);

    if (request.status === 200) {
        let data = JSON.parse(request.responseText);

        for (let groupKey of Object.keys(data.characters)) {
            const group = data.characters[groupKey];
            
            for (let charKey of Object.keys(group.characters)) {
                const character = group.characters[charKey];
                
                for (let indicatorEmoji of Object.keys(character.indicators)) {
                    const [indicator, indicatorName] = character.indicators[indicatorEmoji];
                    indicators.push([character.name, indicatorEmoji, indicatorName]);
                }
            }
        }
    }
    else {
        console.error('Failed to fetch characters.json:', request.statusText);
    }

    return indicators;
}


console.log(getIndicators());

function loadIndicators() {
    let indicatorSelection = document.getElementById("indicator-selection");
    let indicators = getIndicators();
    for (let indicator of indicators) {
        let option = document.createElement("option");
        option.value = indicator[1];
        option.textContent = indicator[1] + " - " + indicator[2];
        indicatorSelection.appendChild(option);
        console.log(option)
    }
}
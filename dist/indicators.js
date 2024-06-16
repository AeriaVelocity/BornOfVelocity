"use strict";
function getIndicators() {
    let indicators = [];
    let request = new XMLHttpRequest();
    request.open('GET', 'db.json', false);
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
        console.error('Failed to fetch db.json:', request.statusText);
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
        if (indicatorSelection) {
            indicatorSelection.appendChild(option);
        }
        else {
            console.error("No `indicator-selection` div?");
        }
        console.log(option);
    }
}

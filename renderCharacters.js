// renderCharacters.js - Render the list of characters from `characters.json`.

// To use for `index.html`, import as <script src="renderCharacters.js" onload="renderShortForm()"></script>
// To use for `characters.html`, import as <script src="renderCharacters.js" onload="renderFullForm()"></script>

const charactersArea = document.getElementById("characters-area");

function renderShortForm() {
    fetch('characters.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let characterGroupKey in data.characters) {
                let characterGroup = data.characters[characterGroupKey];
                
                let groupHeader = document.createElement("h3");
                groupHeader.textContent = characterGroup.name;
                charactersArea.appendChild(groupHeader);

                let ul = document.createElement("ul");

                for (let characterKey in characterGroup.characters) {
                    let character = characterGroup.characters[characterKey];
                    let li = document.createElement("li");
                    let characterIndicators = "";
                    for (let indicator in character.indicators) {
                        characterIndicators += indicator + " (" + character.indicators[indicator][0] + ")";
                        if (indicator !== Object.keys(character.indicators)[Object.keys(character.indicators).length - 1]) {
                            characterIndicators += ", ";
                        }
                    }
                    li.innerHTML = `
                        <strong>${character.name}</strong> (${character.series})
                        <ul>
                            <li>${character.description}</li>
                            <li><strong>Indicators:</strong> ${characterIndicators}</li>
                        </ul>
                        `;
                    ul.appendChild(li);
                }

                charactersArea.appendChild(ul);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function renderFullForm() {
    fetch('characters.json').then(response => response.json())
        .then(data => {
            console.log(data);

            for (let characterGroupKey in data.characters) {
                let characterGroup = data.characters[characterGroupKey];
                
                let groupHeader = document.createElement("h3");
                groupHeader.textContent = characterGroup.name;
                charactersArea.appendChild(groupHeader);

                let groupDescription = document.createElement("p");
                groupDescription.textContent = characterGroup.description;
                charactersArea.appendChild(groupDescription);

                let ul = document.createElement("ul");

                for (let characterKey in characterGroup.characters) {
                    let character = characterGroup.characters[characterKey];
                    let li = document.createElement("li");
                    let characterIndicators = "";
                    for (let indicator in character.indicators) {
                        characterIndicators += `
                            <ul>
                                <li>${indicator} (${character.indicators[indicator][0]}) - ${character.indicators[indicator][1]}</li>
                            </ul>`
                    }

                    let characterRelationships = "";
                    for (let relationship in character.relationships) {
                        characterRelationships += `
                            <ul>
                                <li><strong>${relationship}</strong>: ${character.relationships[relationship]}</li>
                            </ul>`
                    }
                    if (characterRelationships == "") {
                        characterRelationships = "None added.";
                    }

                    let characterAppearance = "";
                    if (character.appearance == "[object Object]") {
                        for (let appearance in character.appearance) {
                            characterAppearance += `
                                <ul>
                                    <li><strong>${appearance}</strong>: ${character.appearance[appearance]}</li>
                                </ul>`
                        }
                    }
                    else {
                        characterAppearance = character.appearance
                    }

                    li.innerHTML = `
                        <strong>${character.name}</strong>
                        <ul>
                            <li><strong>Series: </strong> ${character.series}</li>
                            <li><strong>Gender: </strong> ${character.gender}</li>
                            <li><strong>Description: </strong> ${character.description}</li>
                            <li><strong>Appearance: </strong> ${characterAppearance}</li>
                            <li><strong>Indicators: </strong> ${characterIndicators}</li>
                            <li><strong>Relationships: </strong> ${characterRelationships}</li>
                        </ul>
                        `;
                    ul.appendChild(li);
                }

                charactersArea.appendChild(ul);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

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
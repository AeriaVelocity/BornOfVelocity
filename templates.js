
// templates.js - Copy templates for in-character and out-of-character messages.

let indicator = "_";
let spacerCharacter = 'ㅤ'; // U+3164 "HANGUL FILLER"

let oocLink = 'https://www.velocity.xn--6ii';

function getTweetTemplate(withSpacing) {
    let tweetTemplate = `{${indicator}}  ❝  ❞`;    

    if (withSpacing) {
        tweetTemplate = spacerCharacter + "\n" + tweetTemplate + "\n" + spacerCharacter;
    }

    navigator.clipboard.writeText(tweetTemplate);

    alert('Tweet template copied to clipboard.');
}

function getOocLink() {
    navigator.clipboard.writeText(oocLink);
    alert('Out-of-context link copied to clipboard.');
}

function updateIndicator(newIndicator) {
    indicator = newIndicator;
    let tweetTemplate = document.getElementById("tweet-template");
    let templateValue = tweetTemplate.textContent;
    tweetTemplate.textContent = templateValue.replace(/\{[^}]*\}/g, `{${newIndicator}}`);
}
"use strict";
let indicator = "_";
let spacerCharacter = 'ㅤ';
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
    if (tweetTemplate && tweetTemplate.textContent) {
        let templateValue = tweetTemplate.textContent;
        tweetTemplate.textContent = templateValue.replace(/\{[^}]*\}/g, `{${newIndicator}}`);
    }
    else {
        console.error("No `tweet-template` div?");
    }
}

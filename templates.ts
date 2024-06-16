
// templates.ts - Copy templates for in-character and out-of-character messages.

let indicator = "_";
let spacerCharacter = 'ㅤ'; // U+3164 "HANGUL FILLER"

let oocLink = 'https://www.velocity.xn--6ii';

function getTweetTemplate(withSpacing: boolean) {
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

function updateIndicator(newIndicator: string) {
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
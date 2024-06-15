// licenseInfo.js - Render information about the license.

const licenseInfoArea = document.getElementById("license-info");
const licenseInfo = fetch("characters.json").then(response => response.json()).then(data => {
    let licenseName = `<a href="${data.about.license.url}">${data.about.license.short} (${data.about.license.full})</a>`;
    licenseInfoArea.innerHTML = `
        <p>Born Of Velocity is licensed under ${licenseName}.</p>
        <p>${data.about.license.rights}</p>
    `
});
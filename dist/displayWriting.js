"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const content = document.getElementById("content");
const writingsList = document.getElementById("writings-list");
const file = getFilePath();
const options = {
    renderer: new marked.Renderer(),
    breaks: true,
};
const walkTokens = (token) => {
    if (token) {
        if (token.type === "heading") {
            token.depth += 1;
        }
    }
};
marked.use(options, { walkTokens });
function renderContent(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (content) {
                const fileFetch = yield fetch(fileName);
                if (fileFetch.ok) {
                    const fileContents = yield fileFetch.text();
                    content.innerHTML = marked.parse(fileContents);
                }
                else {
                    content.innerHTML = `File ${fileName} not found.`;
                }
            }
        }
        catch (e) {
            console.error(`Failed to render content: ${e}`);
            if (content) {
                content.innerHTML = `<p>Failed to render content, because ${e}</p>`;
            }
        }
    });
}
function renderWritingsList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (writingsList) {
                const metadataList = yield getFileMetadata();
                if (metadataList) {
                    metadataList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    const listItems = metadataList.map(metadata => {
                        const listItem = document.createElement("li");
                        const item = document.createElement("p");
                        const href = `?md=${metadata.filename}`;
                        const date = new Date(metadata.date);
                        function getLongDate(date) {
                            const day = date.getDate();
                            const ordSuffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th";
                            const month = date.toLocaleString("default", { month: "long" });
                            const year = date.getFullYear();
                            return `${month} ${day}${ordSuffix}, ${year}`;
                        }
                        item.innerHTML = `<p><a href="${href}">${metadata.title}</a> - ${getLongDate(date)} - ${metadata.author}<br>${metadata.description}</p>`;
                        listItem.appendChild(item);
                        return listItem;
                    });
                    writingsList.innerHTML = "";
                    listItems.forEach(item => writingsList.appendChild(item));
                }
            }
        }
        catch (e) {
            console.error(`Failed to render writings list: ${e}`);
        }
    });
}
function getFileMetadata() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("writings/metadata.csv");
            if (!response.ok) {
                throw new Error(`Failed to fetch metadata: ${response.statusText}`);
            }
            const data = yield response.text();
            const metadataList = parseCSV(data);
            return metadataList;
        }
        catch (e) {
            console.error(`Failed to fetch metadata: ${e}`);
        }
    });
}
function parseCSV(csv) {
    const lines = csv.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    const headers = lines[0].split(",").map(header => header.trim());
    const metadataList = lines.slice(1).map(line => {
        const values = line.split(",").map(value => value.trim());
        const metadata = {};
        for (let i = 0; i < headers.length; i++) {
            metadata[headers[i]] = values[i];
        }
        return metadata;
    });
    return metadataList;
}
function getFilePath() {
    let urlParams = new URLSearchParams(window.location.search);
    let writingParam = urlParams.get("md");
    return writingParam || "";
}
if (file && file.length > 0) {
    const fileName = `writings/${file}.md`;
    renderContent(fileName);
}
else {
    if (content) {
        content.innerHTML = "No file specified.";
    }
}
renderWritingsList();

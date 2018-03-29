import * as puppeteer from "puppeteer";

export {
    load,
    close,
    evaluate,
}

let browser;
let page;
async function load() {
    browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        // headless: false,
    });
    page = await browser.newPage();
    page.goto("localhost:8080");
}

function evaluate(cb: () => void) {
    return page.evaluate(cb);
}
function close() {
    browser.close()
}

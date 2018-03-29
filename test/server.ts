import * as puppeteer from "puppeteer";

export {
    page,
    load,
    close,
    evaluate,
    retrieve,
}

let browser;
let page;
async function load() {
    browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium-browser",
        // headless: false,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8080/");
}

function evaluate(cb, ...args) {
    return page.evaluate(cb, ...args);
}
function close() {
    browser.close();
}

function retrieve(path: string) {
    return page.$(path);
}

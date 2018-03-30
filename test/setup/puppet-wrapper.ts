import * as puppeteer from "puppeteer";

export {
    page,
    load,
    close,
}

let browser;
let page;

async function load() {
    browser = await puppeteer.launch({
        // executablePath: "/usr/bin/chromium-browser",
        // headless: true,
    });
    page = await browser.newPage();
    await page.goto("http://127.0.0.1:8080/");
}

function close() {
    browser.close();
}

import { WebDriver } from "selenium-webdriver";

export {
  getYOffset,
}

async function getYOffset(browser: WebDriver) {
  return await browser.executeScript(() => {
    return window.pageYOffset;
  });
}

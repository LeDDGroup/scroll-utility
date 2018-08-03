const browserstackUser = "davidperezalvare2";

const buildName = process.env["CI"]
  ? process.env["TRAVIS_BUILD_NUMBER"] as string + " " + process.env["TRAVIS_BRANCH"] as string
  : "general-build";

const basicCap = {
  "browserstack.user": browserstackUser,
  "browserstack.key": process.env["BROWSERSTACK_ACCESS_KEY"],
  "browserstack.local": true,
  "browserstack.localIdentifier": process.env["BROWSERSTACK_LOCAL_IDENTIFIER"],
  "browserstack.debug": true,
  build: buildName,
  name: "general-test",
  project : "scroll-utility",
  resolution: "1024x768",
};

const windowCap = {
  ...basicCap,
  os: "Windows",
  os_version: "10",
};

const macCap = {
  ...basicCap,
  os: "OS X",
  os_version: "High Sierra",
};

const capabilities = {
  Windows: {
    chrome: {
      ...windowCap,
      browserName: "Chrome",
      browser_version: "66.0",
    },
    firefox: {
      ...windowCap,
      browserName: "Firefox",
      browser_version: "60.0",
    },
    edge: {
      ...windowCap,
      browserName: "Edge",
      browser_version: "17.0",
    },
  },
  macOs: {
    chrome: {
      ...macCap,
      browserName: "Chrome",
      browser_version: "66.0",
    },
    firefox: {
      ...macCap,
      browserName: "Firefox",
      browser_version: "60.0",
    },
    safari: {
      ...macCap,
      browserName: "Safari",
      browser_version: "11.1",
    },
    // opera: {
    //     ...macCap,
    //     browserName: "Opera",
    //     browser_version: "12.15",
    // },
  },
};

export default capabilities;

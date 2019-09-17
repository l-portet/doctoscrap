(async () => {
  // External modules
  const pup = require('puppeteer');
  const fs = require('fs');
  // Internal modules
  const setup = require('./src/setup'),
    run = require('./src/run'),
    close = require('./src/close'),
    hooks = require('./src/hooks')();

  // Setting all up
  hooks.beforeSetup();
  const browser = await pup.launch({ headless: false });
  let data = [];
  let page = await setup(browser, data);
  hooks.afterSetup();

  // Logic in run
  page = await run(page);

  hooks.beforeClose();
  close(browser, data);
  hooks.afterClose(data);
})();

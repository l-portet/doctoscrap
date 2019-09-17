module.exports = function close(browser, data) {
  const fs = require('fs');

  browser.close();

  let fileContent = JSON.stringify(data);

  fs.writeFile(`output.json`, fileContent, () => {});
};

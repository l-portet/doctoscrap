module.exports = async function close(browser, data) {
  const fs = require('fs');

  await browser.close();

  let fileContent = JSON.stringify(data);

  fs.writeFile(`output.json`, fileContent, () => {});
};

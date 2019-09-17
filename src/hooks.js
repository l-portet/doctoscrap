module.exports = function() {
  const ora = require('ora');

  const spins = {
    setup: ora('Setting all up and fetching website'),
    scraping: ora('Scraped 0 pages (may take a while, grab a beer)'),
    close: ora('Closing')
  };
  return {
    beforeSetup() {
      spins.setup.start();
    },
    afterSetup() {
      spins.setup.succeed();
    },
    beforeRun() {
      spins.scraping.start();
      // console.time('timer');
    },
    onPaginate(nbPages) {
      spins.scraping.text = `Scraped ${nbPages} pages (may take a while, grab a beer)`;
    },
    afterRun() {
      // console.timeEnd('timer');
      spins.scraping.succeed();
    },
    beforeClose() {
      spins.close.start();
    },
    afterClose(data) {
      spins.close.text = `Done scraped ${data.length} items! 🍻`;
      spins.close.succeed();
    }
  };
};

const hooks = require('./hooks')();
const config = require('../config');

module.exports = async function run(page) {
  // URL template => https://www.doctolib.fr/${type}/${location}
  await page.goto(
    `https://www.doctolib.fr/${config.query.type}/${config.query.location}`
  );

  hooks.beforeRun();
  let isLastPage = false;
  let nbPages = 0;

  while (!isLastPage) {
    isLastPage = await scrollPage();
    nbPages++;
    hooks.onPaginate(nbPages);
  }

  hooks.afterRun();
  return page;

  async function scrollPage() {
    return new Promise((resolve, reject) => {
      let isAtBottom = false;
      let scrolling = setInterval(async () => {
        isAtBottom = await page.evaluate(() => {
          window.scrollTo(0, window.scrollY + 700);
          return (
            document.body.offsetHeight === window.scrollY + window.innerHeight
          );
        });
        if (isAtBottom) {
          clearInterval(scrolling);
          let res = await goNextPage();

          resolve(!res);
        }
      }, 150);
    });
  }

  async function goNextPage() {
    let url = await getNextPageURL();
    if (url !== null) {
      await page.goto(url);
      return true;
    }
    return false;
  }

  async function getNextPageURL() {
    return await page.evaluate(() => {
      // If no more items with apointments stop scraping
      if (document.querySelector('.directory')) return null;

      let url = document.querySelector('.next a').getAttribute('href');

      return url ? 'https://doctolib.fr' + url : null;
    });
  }
};

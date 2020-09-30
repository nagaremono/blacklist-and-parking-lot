const fs = require('fs');
const path = require('path');

const main = (() => {
  let blackListed;

  async function initialize(blacklist) {
    const readableStream = fs.createReadStream(
      path.join(__dirname, blacklist),
      {
        encoding: 'utf8',
      }
    );

    let blacklistString = '';

    for await (const chunk of readableStream) {
      blacklistString += chunk;
    }

    blackListed = blacklistString.split('\n').sort();
  }

  async function checkBlacklist(name, phoneNumber) {
    return blackListed.includes(`${name} ${phoneNumber}`);
  }

  return { initialize, checkBlacklist };
})();

main
  .initialize('./blacklist.txt')
  .then(() => main.checkBlacklist('Sarah', '24235245'))
  .then((result) => console.log(result));

const { createWriteStream } = require('fs');

const { format } = require('prettier');

function writeDenormalization(name, collection) {
  for (const k in collection) {
    const filename = k.replace(/ /g, '-').replace(/'/g, '').toLowerCase();
    const ws = createWriteStream(`./${name}/${filename}.json`);

    ws.write(format(JSON.stringify(collection[k]), { parser: 'json' }));
    ws.end();
  }
}

module.exports = {
  writeDenormalization,
};

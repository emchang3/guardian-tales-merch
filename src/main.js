const { createWriteStream } = require("fs");

const { format } = require("prettier");

const blank = require("../blueprints/blank.json");
const flat = require("../blueprints/flat.json");
const implantable = require("../blueprints/implantable.json");
const round = require("../blueprints/round.json");
const small = require("../blueprints/small.json");
const thick = require("../blueprints/thick.json");
const thin = require("../blueprints/thin.json");

const blueprints = {
  blank,
  flat,
  implantable,
  round,
  small,
  thick,
  thin,
};

const items = {};
const types = {};

for (const k in blueprints) {
  blueprints[k].forEach((item) => {
    const { name, type, probability } = item;

    if (!items[name]) {
      items[name] = {
        type,
        sources: [
          {
            blueprint: k,
            probability,
          },
        ],
      };
    } else {
      items[name].sources.push({
        blueprint: k,
        probability,
      });
    }
  });
}

for (const k in items) {
  const { sources, type } = items[k];

  if (!types[type]) {
    types[type] = [
      {
        name: k,
        sources,
      },
    ];
  } else {
    types[type].push({
      name: k,
      sources,
    });
  }
}

for (const k in items) {
  const filename = k.replace(/ /g, "-").replace(/'/g, "").toLowerCase();
  const ws = createWriteStream(`./items/${filename}.json`);

  ws.write(format(JSON.stringify(items[k]), { parser: "json" }));
  ws.end();
}

for (const k in types) {
  const filename = k.replace(/ /g, "-").replace(/'/g, "").toLowerCase();
  const ws = createWriteStream(`./types/${filename}.json`);

  ws.write(format(JSON.stringify(types[k]), { parser: "json" }));
  ws.end();
}

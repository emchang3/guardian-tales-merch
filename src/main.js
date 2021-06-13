const { createWriteStream } = require("fs");

const { format } = require("prettier");

const blank = require("../blueprints/blank.json");
const flat = require("../blueprints/round.json");
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
    if (!items[item.name]) {
      items[item.name] = {
        type: item.type,
        sources: [
          {
            blueprint: k,
            probability: item.probability,
          },
        ],
      };
    } else {
      items[item.name].sources.push({
        blueprint: k,
        probability: item.probability,
      });
    }
  });
}

for (const k in items) {
  if (!types[items[k].type]) {
    types[items[k].type] = [
      {
        name: k,
        sources: items[k].sources,
      },
    ];
  } else {
    types[items[k].type].push({
      name: k,
      sources: items[k].sources,
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

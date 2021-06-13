function compileItems(blueprints) {
  const items = {};

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

  return items;
}

function deriveTypes(items) {
  const types = {};

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
}

module.exports = {
  compileItems,
  deriveTypes,
};

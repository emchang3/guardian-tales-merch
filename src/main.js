const { compileItems, deriveTypes } = require('./denormalization');

const { writeDenormalization } = require('./utils/fs-utils');

const blank = require('../blueprints/blank.json');
const flat = require('../blueprints/flat.json');
const implantable = require('../blueprints/implantable.json');
const round = require('../blueprints/round.json');
const small = require('../blueprints/small.json');
const thick = require('../blueprints/thick.json');
const thin = require('../blueprints/thin.json');

const blueprints = {
  blank,
  flat,
  implantable,
  round,
  small,
  thick,
  thin,
};

const items = compileItems(blueprints);
const types = deriveTypes(items);

writeDenormalization('items', items);
writeDenormalization('types', types);

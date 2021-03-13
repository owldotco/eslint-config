// In case we move to PnP, ensure it's depended on/imported, but
// leave the `extends` option to an easily recognised value rather
// than a resolved path.
require('@owldotco/eslint-config');

module.exports = {
  extends: ['@owldotco/eslint-config'],
};

module.exports = {
  rules: {
    'type-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(PRS)-(.+):(.+)$/,
    },
  }
};

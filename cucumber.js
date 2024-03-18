const config = {
  frontend: {
    paths: ['tests/frontend/**/*.feature'],
    require: ['tests/frontend/**/*.steps.ts', 'tests/_common/common-hooks.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' }
  },
  api: {
    paths: ['tests/api/**/*.feature'],
    require: ['tests/api/**/*.steps.ts', 'tests/_common/common-hooks.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' }
  },
  all: {
    paths: ['tests/**/**/*.feature'],
    require: ['tests/**/**/*.steps.ts', 'tests/_common/common-hooks.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'summary',
      'progress-bar',
    ],
    formatOptions: { snippetInterface: 'async-await' }
  }
};

module.exports = config
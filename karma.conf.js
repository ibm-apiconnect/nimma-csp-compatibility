/* eslint-env node */
const esbuild = require('esbuild');

// Bundles each test file (and its bare-specifier imports from node_modules) into a classic script.
function createEsbuildPreprocessor() {
  return async function (content, file, done) {
    try {
      const { outputFiles } = await esbuild.build({
        bundle: true,
        entryPoints: [file.originalPath],
        format: 'iife',
        platform: 'browser',
        define: { global: 'globalThis' },
        target: 'es2022',
        write: false,
      });
      done(null, outputFiles[0].text);
    } catch (ex) {
      done(ex);
    }
  };
}

module.exports = function (config) {
  config.set({
    browsers: ['FirefoxHeadless', 'ChromeHeadless'],
    files: [
      {
        pattern: 'src/**/__tests__/**/*.test.mjs',
        type: 'js',
        watched: false,
      },
    ],
    frameworks: ['mocha'],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      { 'preprocessor:esbuild': ['factory', createEsbuildPreprocessor] },
    ],
    preprocessors: {
      'src/**/*.mjs': ['esbuild'],
    },
    singleRun: true,
  });
};

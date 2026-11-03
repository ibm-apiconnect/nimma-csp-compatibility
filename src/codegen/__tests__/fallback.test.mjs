import chai from 'chai';
import forEach from 'mocha-each';

import normalizeSource from '../../__tests__/__helpers__/normalize-source.mjs';
import Fallback from '../fallback.mjs';

const { expect } = chai;

describe('Fallback', () => {
  forEach([
    /* eslint-disable no-unused-vars */
    function (input, path, fn) {},
    function bar(input, path, fn) {},
    (input, path, fn) => {},
    /* eslint-enable no-unused-vars */
  ]).it('%s', fn => {
    const fb = new Fallback({}, fn);

    expect(normalizeSource(fb.extraCode)).to.equal(
      normalizeSource('(input, path, fn) => {}'),
    );
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'segmentation-image\' service', () => {
  it('registered the service', () => {
    const service = app.service('segmentation-image');

    assert.ok(service, 'Registered the service');
  });
});

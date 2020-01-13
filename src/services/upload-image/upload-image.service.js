// Initializes the `upload-image` service on path `/upload-image`
const { UploadImage } = require('./upload-image.class');
const createModel = require('../../models/upload-image.model');
const hooks = require('./upload-image.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/upload-image', new UploadImage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload-image');

  service.hooks(hooks);
};

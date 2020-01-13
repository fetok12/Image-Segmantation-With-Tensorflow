const uploadImage = require('./upload-image/upload-image.service.js');
const uploadImages = require('./upload-images/upload-images.service.js');
const segmentationImage = require('./segmentation-image/segmentation-image.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(uploadImage);
  app.configure(uploadImages);
  app.configure(segmentationImage);
};

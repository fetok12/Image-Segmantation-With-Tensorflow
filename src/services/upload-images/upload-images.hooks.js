

const processImage = require('../../hooks/process-image');
const resizeOptimizeImages = require('resize-optimize-images');
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [function(context) {
      (async () => {
        // Set the options.
        const options = {
          images: [`${context.data[0].newNameWithPath}`],
          width: 600,
          quality:parseInt(context.data[0].quality)
        };
        
        // Run the module.
        await resizeOptimizeImages(options);
      })();

    
  }],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

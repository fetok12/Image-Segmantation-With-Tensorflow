const tfjs = require('@tensorflow/tfjs');
import * as cocoSsd from '@tensorflow-models/coco-ssd';

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [async context => {

      const promise1 = new Promise(function (resolve, reject) {

        const { createCanvas, Image } = require('canvas');
        const img = new Image();
        img.src = `${context.data[0].newNameWithPath}`;
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          const input = tfjs.browser.fromPixels(canvas);
          (async () => {
            const model = await cocoSsd.load().catch((err) => {
              //console.log(err);
            });

            // Classify the image.
            const predictions = await model.detect(input).catch((err) => {
              //console.log(err);
            });
            //console.log(predictions);
            // console.log(__dirname)

            predictions.forEach(predicted => {
              const x = predicted.bbox[0]
              const y = predicted.bbox[1]
              const width = predicted.bbox[2]
              const height = predicted.bbox[3]
              ctx.strokeStyle = "#c92121";
              ctx.lineWidth = 3;
              ctx.strokeRect(x, y, width, height);
              ctx.font = "50px Arial";
              ctx.strokeText(`${predicted.class}`, x, y);

            })
            const dataURL = canvas.toDataURL('image/jpeg')
            resolve(dataURL);
          })();
        };
        img.onload();
      });

      return promise1.then(function (value) {
        // console.log(JSON.stringify(value));
        context.data = value;
        return context;
      });
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

// Initializes the `upload-images` service on path `/upload-images`
const { UploadImages } = require('./upload-images.class');
const createModel = require('../../models/upload-images.model');
const hooks = require('./upload-images.hooks');

// feathers-blob service
const blobService = require('feathers-blob');
const multer = require('multer');
const multipartMiddleware = multer();
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const blobStorage = fs('./uploads');

const resizeOptimizeImages = require('resize-optimize-images');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+8, // Max field value size in bytes, here it's 100MB
    fileSize: 1e+7 //  The max file size in bytes, here it's 10MB
    // files: the number of files
    // READ MORE https://www.npmjs.com/package/multer#limits
  }
});

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: [ 'create' ] 
  };


  
  // // Initialize our service with any options it requires
  // app.use('/upload-images',
  //  // multer parses the file named 'uri'.
  //   // Without extra params the data is
  //   // temporarely kept in memory
  //   multipartMiddleware.single('uri'),

  //   // another middleware, this time to
  //   // transfer the received file to feathers
  //   function(req,res,next){
  //       req.feathers.file = req.file;
  //       next();
  //   },
  //    blobService({ Model: blobStorage}));

  app.use('/upload-images',
    upload.array('files'), (req, _res, next) => {
      const { method } = req;
      if (method === 'POST' || method === 'PATCH') {
        // I believe this middleware should only transfer
        // files to feathers and call next();
        // and the mapping of data to the model shape
        // should be in a hook.
        // this code is only for this demo.
        req.feathers.files = req.files; // transfer the received files to feathers
        // for transforming the request to the model shape
        const body = [];
        for (const file of req.files)
          body.push({
            orignalName: file.originalname,
            newNameWithPath: file.path,
            quality:req.body.quality
          });
        req.body = method === 'POST' ? body : body[0];
      }
      next();
    }, new UploadImages(options, app));



  // Get our initialized service so that we can register hooks
  const service = app.service('upload-images');

  service.hooks(hooks);
};

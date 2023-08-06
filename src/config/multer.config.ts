import multer from "multer";

export class MulterSetup {
    private storage: multer.StorageEngine;
  
    constructor() {
      this.storage = multer.diskStorage({
        destination: (req, file, cb) => {
          // Specify the directory where files should be stored
          cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
          // Generate a unique filename (you can customize this as per your requirements)
          cb(null, Date.now() + '-' + file.originalname);
        },
      });
    }
  
    public getUploader(): multer.Multer {
      return multer({ storage: this.storage });
    }
  }
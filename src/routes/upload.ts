import express from "express";
import { UploadController } from "../controller/upload";
import { MulterSetup } from "../config/multer.config";
import multer from "multer";
const UploadRoute:express.Router = express.Router();
const controller:UploadController = new UploadController()
const upload = multer({ dest: './public/data/uploads/' })

UploadRoute.post('/',upload.single('file'), controller.handleUpload)

export default UploadRoute;
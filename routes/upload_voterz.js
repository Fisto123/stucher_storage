import express from "express";

import multer from "multer";
import path from "path";
import { replaceImage, uploadImage } from "../controllers/voterz_upload.js";
const routes = express.Router({ mergeParams: true });

function generateRandomAlphanumeric() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

let randomString = generateRandomAlphanumeric();

const imageStorage = (fieldname) => {
  return multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, `./public/voterz/${fieldname}/`);
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        `${randomString}${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

const replaceLogoUpload = (fieldname) => {
  return multer.memoryStorage({
    destination: (req, file, callBack) => {
      callBack(null, `./public/voterz/${fieldname}/`);
    },
    filename: (req, file, callBack) => {
      callBack(null, `${fieldname}${path.extname(file.originalname)}`);
    },
  });
};

const imageUpload = multer({
  storage: imageStorage("images"),
});
const replaceUpload = multer({
  storage: replaceLogoUpload("images"),
});
// Route for image uploads

routes.put("/uploadimage", imageUpload.single("myimage"), uploadImage);
routes.put("/replaceimage", replaceUpload.single("myimage"), replaceImage);

export default routes;

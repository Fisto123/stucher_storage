import express from "express";
import {
  deleteCourseLessonsVideos,
  reachable,
  replacevideo,
  uploadImage,
  uploadImages,
  uploadVideo,
} from "../controllers/upload.js";
import multer from "multer";
import path from "path";
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
      callBack(null, `./public/${fieldname}/`);
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        `${randomString}${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

const replaceVideoUpload = (fieldname, folder) => {
  return multer.memoryStorage({
    destination: (req, file, callBack) => {
      callBack(null, `./public/videos/`);
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        `${fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

const videoStorage = (fieldname) => {
  return multer.diskStorage({
    destination: (req, file, callBack) => {
      if (fieldname === "videos") {
        callBack(null, `./public/videos/`);
      }
    },
    filename: (req, file, callBack) => {
      callBack(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  });
};

const imageUpload = multer({
  storage: imageStorage("images"),
});

const videoUpload = multer({
  storage: videoStorage("videos"),
});
const videoUpload2 = multer({
  storage: replaceVideoUpload("videos"),
});

// Route for image uploads
routes.put("/addsingleimage", imageUpload.single("myimage"), uploadImage);
routes.put("/addmultipleimages", imageUpload.array("myimages"), uploadImages);
routes.put("/addsinglevideo", videoUpload.single("myvideo"), uploadVideo);
routes.put("/replacevideo", videoUpload2.single("newvideo"), replacevideo);
routes.delete("/deletecourselessonsvideos", deleteCourseLessonsVideos);
routes.get("/reachable", reachable);

export default routes;

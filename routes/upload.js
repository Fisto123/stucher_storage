import express from "express";
import {
  test,
  uploadCACImage,
  uploadProfile,
  uploadUtilityImage,
  uploadVideo,
  uploadVideoLesson,
  uploadcourseimage,
  uploadlessonimage,
} from "../controllers/upload.js";
import multer from "multer";
import path from "path";
const routes = express.Router({ mergeParams: true });

const between = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let randi = between(10000, 100000);
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

const imageFileFilter = (req, file, cb) => {
  const allowedImageTypes = /png|jpg|jpeg/;
  const extname = allowedImageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedImageTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb("Error: Only images with PNG, JPG, or JPEG format are allowed!");
  }
};

const videoFileFilter = (req, file, cb) => {
  const allowedVideoTypes = /mp4|avi|mkv|mov/;
  const extname = allowedVideoTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedVideoTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      "Error: Only video files with MP4, AVI, MKV, or MOV format are allowed!"
    );
  }
};

const imageStorage = (fieldname, folder) => {
  return multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, `./public/images/${folder}/`);
    },
    filename: (req, file, callBack) => {
      callBack(
        null,
        `${randomString}${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
};

const videoStorage = (fieldname, folder) => {
  return multer.diskStorage({
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

const imageUpload = multer({
  storage: imageStorage("profilepix", "profilepix"),
  fileFilter: imageFileFilter,
});

const videoUpload = multer({
  storage: videoStorage("videoss", "docs"),
  //fileFilter: videoFileFilter,
});
const cacImageUpload = multer({
  storage: imageStorage("cac", "docs"),
});

const utilityImageUpload = multer({
  storage: imageStorage("utility", "utility"),
});

// Route for image uploads
routes.put("/uploadpix", imageUpload.single("profilepix"), uploadProfile);
routes.put(
  "/uploadcourseimage",
  imageUpload.single("courseimage"),
  uploadcourseimage
);
routes.put(
  "/uploadlessonimage",
  imageUpload.single("lessonimage"),
  uploadlessonimage
);

//this is for dewpay please ignore

routes.put("/uploadcacimage", cacImageUpload.single("cac"), uploadCACImage);
routes.put(
  "/uploadutilityimage",
  utilityImageUpload.single("utility"),
  uploadUtilityImage
);

//this is for dewpay please ignore

// Route for video uploads
routes.put("/uploadvid", videoUpload.single("coursevideos"), uploadVideo);
routes.put(
  "/uploadlessonvideo",
  videoUpload.single("lessonvideos"),
  //checkVideoDuration(300),
  uploadVideoLesson
);

routes.get("/test", test);

export default routes;

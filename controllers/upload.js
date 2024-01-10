import { promises as fsPromises } from "fs";
import path from "path";

const publicLink = "http://192.168.0.134:4100/";
const secondlink = "https://stucherstorage.michofat.com/public/";
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }
    //192.168.0.134:4100/public/videos/

    const image = `${publicLink}images/` + req.file.filename;
    res.status(200).send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// controllers/upload.js

export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      res.status(404).send("No file uploaded");
    } else {
      // Assuming you have a videos folder in your public directory
      const video = `${publicLink}videos/` + req.file.filename;

      res.status(200).send(video);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const replacevideo = async (req, res) => {
  let { videolink } = req.body;
  console.log(req.file);
  try {
    const extractedFilename = extractFileNameFromUrls(videolink);

    if (extractedFilename) {
      const currentDir = path.dirname(new URL(import.meta.url).pathname);
      const publicVideosPath = path.resolve(
        currentDir,
        "..",
        "public",
        "videos",
        extractedFilename
      );

      try {
        await fsPromises.access(publicVideosPath);
        await fsPromises.unlink(publicVideosPath);
        console.log("File unlinked successfully:", publicVideosPath);
      } catch (unlinkError) {
        // Handle the case where the file doesn't exist
        console.error("File does not exist:", publicVideosPath);
      }
    }

    const timestamp = Date.now();
    const newVideoFilename = `${timestamp}${path.extname(
      req.file.originalname
    )}`;
    const currentDir = path.dirname(new URL(import.meta.url).pathname);

    const newVideoPath = `${publicLink}videos/`;
    const filePath = path.resolve(
      currentDir,
      "..",
      "public",
      "videos",
      newVideoFilename
    );

    await fsPromises.writeFile(filePath, req.file.buffer);
    console.log("File written successfully:", filePath);

    res.status(200).send(newVideoPath + newVideoFilename);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadVideoLesson = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      res.status(404).send("No file uploaded");
    } else {
      // Assuming you have a videos folder in your public directory
      const videoSrc = `https://stucherstorage.michofat.com/public/videos/${req.file.filename}`;
      res.status(200).send(videoSrc);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const test = async (req, res) => {
  console.log("hello");
};

export const deleteCourseLessonsVideos = async (req, res, next) => {
  let { videoLinks } = req.body;
  let parsedVideoLinks = JSON.parse(videoLinks);
  try {
    for (const lessonvidlink of parsedVideoLinks) {
      const extractedFilename = extractFilenameFromURL(lessonvidlink);

      if (extractedFilename) {
        const currentDir = path.dirname(new URL(import.meta.url).pathname);
        const publicVideosPath = path.resolve(
          currentDir,
          "..",
          "public",
          "videos",
          extractedFilename
        );

        try {
          await fsPromises.access(publicVideosPath);
          await fsPromises.unlink(publicVideosPath);
          console.log("File unlinked successfully:", publicVideosPath);
        } catch (unlinkError) {
          console.error("File does not exist:", publicVideosPath);
        }
      }
    }

    res.status(200).send("Videos deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadcourseimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "stucherstorage.michofat.com/public/images/courseimage/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadlessonimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/lessons/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadUtilityImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/lessons/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadCACImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/lessons/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadlogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/logo/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const uploadaboutpix = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/aboutpix/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadProductimage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/productpix/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateLessonVideo = async (req, res) => {
  let { lessonvidlink } = req.body;
  try {
    const extractedFilename = extractFilenameFromURL(lessonvidlink);

    if (extractedFilename) {
      const currentDir = path.dirname(new URL(import.meta.url).pathname);
      const publicVideosPath = path.resolve(
        currentDir,
        "..",
        "public",
        "videos",
        extractedFilename
      );

      try {
        await fsPromises.access(publicVideosPath);
        await fsPromises.unlink(publicVideosPath);
        console.log("File unlinked successfully:", publicVideosPath);
      } catch (unlinkError) {
        // Handle the case where the file doesn't exist
        console.error("File does not exist:", publicVideosPath);
      }
    }

    const timestamp = Date.now();
    const newVideoFilename = `videoss-${timestamp}${path.extname(
      req.file.originalname
    )}`;
    const currentDir = path.dirname(new URL(import.meta.url).pathname);

    const newVideoPath = `https://stucherstorage.michofat.com/public/videos/`;
    const filePath = path.resolve(
      currentDir,
      "..",
      "public",
      "videos",
      newVideoFilename
    );

    await fsPromises.writeFile(filePath, req.file.buffer);
    console.log("File written successfully:", filePath);

    res.status(200).send(newVideoPath + newVideoFilename);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

function extractFilenameFromURL(url) {
  console.log("URL", url);
  try {
    const urlObject = new URL(url);
    console.log("urlObject"), urlObject;
    const pathSegments = urlObject.pathname.split("/");
    console.log("pathSegments", pathSegments);
    const filename = pathSegments[pathSegments.length - 1];
    return filename;
  } catch (error) {
    console.error("Error extracting filename from URL:", error);
    return null;
  }
}

// function extractFileNameFromUrls(videoUrl) {
//   const fileName = path.basename(new URL(videoUrl).pathname);
//   return fileName;
// }

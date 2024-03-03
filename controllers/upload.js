import { promises as fsPromises } from "fs";
import path from "path";
//const publicLink = "https://stucherstorage.michofat.com/public/";

const publicLink = "http://192.168.0.134:4100/";
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const image = `${publicLink}images/` + req.file.filename;
    res.status(200).send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
export const uploadImages = async (req, res) => {
  console.log(req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(404).send("No files uploaded");
    }
    const images = req.files.map(
      (file) => `${publicLink}images/` + file.filename
    );
    res.status(200).send(images);
  } catch (error) {
    console.log(error);
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
    const extractedFilename = extractFilenameFromURL(videolink);

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

export const deleteCourseLessonsVideos = async (req, res, next) => {
  let { videoLinks } = req.body;
  console.log(videoLinks);
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

function extractFilenameFromURL(url) {
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

export const reachable = async (req, res) => {
  console.log("am reachable");
  res.status(200).send({ message: "hi" });
};

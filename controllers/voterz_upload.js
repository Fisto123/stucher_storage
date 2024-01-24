import { promises as fsPromises } from "fs";
import fs from "fs";
import path from "path";

//const publicLink = "http://192.168.0.134:4100/";
const publicLink = "https://stucherstorage.michofat.com/public/";
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }
    //192.168.0.134:4100/public/videos/

    const image = `${publicLink}voterz/images/` + req.file.filename;
    res.status(200).send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const replaceImage = async (req, res) => {
  //
  let imagelink =
    "https://stucherstorage.michofat.com/public/voterz/images/1705015368397.jpg";
  // Declare currentDir here
  const currentDir = path.dirname(new URL(import.meta.url).pathname);

  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).send("No file provided");
    }

    const extractedFilename = extractFilenameFromURL(imagelink);

    if (extractedFilename) {
      const publicImagePath = path.resolve(
        currentDir,
        "..",
        "public",
        "voterz",
        "images",
        extractedFilename
      );

      try {
        // Access and unlink the existing file
        await fsPromises.access(publicImagePath);
        await fsPromises.unlink(publicImagePath);
        console.log("File unlinked successfully:", publicImagePath);
      } catch (unlinkError) {
        console.error("File does not exist:", publicImagePath);
      }
    }

    const timestamp = Date.now();
    const newImageFileName = `${timestamp}${path.extname(
      req.file.originalname
    )}`;

    const newImagePath = path.resolve(
      currentDir,
      "..",
      "public",
      "voterz",
      "images",
      newImageFileName
    );

    // Write the new file
    await fsPromises.writeFile(newImagePath, req.file.buffer);
    console.log("File written successfully:", newImagePath);

    const image = `${publicLink}voterz/images/` + newImageFileName;

    res.status(200).send(image);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// controllers/upload.js

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

function extractFilenameFromURLS(url) {
  try {
    const pathname = new URL(url).pathname;
    return path.basename(pathname);
  } catch (error) {
    console.error("Error extracting filename from URL:", error);
    return null;
  }
}

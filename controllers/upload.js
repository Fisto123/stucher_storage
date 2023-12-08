export const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    const compressedImgSrc =
      "https://stucherstorage.michofat.com/public/images/profilepix/" +
      req.file.filename;
    res.status(200).send(compressedImgSrc);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// controllers/upload.js

export const uploadVideo = async (req, res) => {
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

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
var cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const directory = "uploads";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.post("/upload", upload.single("Myfile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).send("File not uploaded");
    }

    const filedata = await cloudinary.uploader.upload(req.file.path, {});

    res.json(filedata);
  } catch (error) {
    res.send(error);
  }
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
});

module.exports = router;

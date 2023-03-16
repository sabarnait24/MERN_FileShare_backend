const express = require("express");
const multer = require("multer");
const router = express.Router();
const { Fileschema } = require("../models/file");
const upload = multer({ dest: "uploads/" });
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.post("/upload", upload.single("Myfile"), async (req, res) => {
  try {
    if (!req.file) {
      // console.log("filemkkm");
      return res.status(500).send("File not uploaded");
    }
    // console.log(req.file.path);
    const filedata = await cloudinary.uploader.upload(req.file.path, {
      // folder: "ShareFile",
      // resource_type: "auto",
    });

    // console.log(filedata);

    const { originalname } = req.file;
    const { secure_url, bytes, resource_type } = filedata;

    const data = new Fileschema({
      fileName: originalname,
      urlLink: secure_url,
      format: resource_type,
      fileSize: bytes,
    });
    const savedata = await data.save();

    res.json(savedata);
  } catch (error) {
    res.send(error);
  }
});

router.get("/upload/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const file = await Fileschema.findById(id);
    if (!file) {
      return res.status(500).send("File not found");
    }
    const { urlLink, fileSize } = file;
    // console.log(urlLink);/

    res.status(200).json(urlLink);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;

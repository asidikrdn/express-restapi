const httpStatus = require("http-status");
const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  // konfigurasi lokasi penyimpanan file
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  // konfigurasi penamaan file yang unik
  filename: function (req, file, cb) {
    let fileName = `img-${new Date().getTime()}`;
    cb(null, fileName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: diskStorage,
  // limits: 8192000,
  limits: { fileSize: 8192000 }, // 8Mb
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/webp"
    ) {
      return cb(new Error("Only .png, .jpg, .webp and .jpeg format allowed!"));
    } else {
      cb(null, true);
    }
  },
});

exports.singleImage = async (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        throw err;
      } else if (err) {
        // An unknown error occurred when uploading.
        throw err;
      }

      // Everything went fine.
      next();
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  });
};

exports.uploadMultipleImage = async (req, res, next) => {
  upload.fields([
    {
      name: "images",
    },
  ])(req, res, function (err) {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        throw err;
      } else if (err) {
        // An unknown error occurred when uploading.
        throw err;
      }

      // Everything went fine.
      next();
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
    }
  });
};

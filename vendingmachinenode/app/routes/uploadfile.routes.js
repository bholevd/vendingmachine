module.exports = (router) => {
  const uploadFileController = require("../controllers/files.controller");

  // POST for uploading file
  router.post("/upload", uploadFileController.upload);

  // GET get all the files
  router.get("/files", uploadFileController.getListFiles);

  // GET to download the file
  router.get("/files/:name", uploadFileController.download);
};

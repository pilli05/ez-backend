const File = require("../../file-sharing-system/models/File");

const uploadFile = async (req, res) => {
  console.log(req.file);
  console.log(req.user);
  if (req.user.role !== "Ops User") {
    return res
      .status(403)
      .json({ message: "You are not authorized to upload files" });
  }
  try {
    const file = req.file;
    const newFile = new File({
      file_name: file.originalname,
      file_type: file.mimetype,
      uploaded_by: req.user.userId,
      encrypted_url: file.filename,
      uploaded_at: Date.now(),
    });
    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const listFiles = async (req, res) => {
  try {
    const files = await File.find({ uploaded_by: req.user.userId });
    res.status(200).json({ files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  uploadFile,
  listFiles,
};

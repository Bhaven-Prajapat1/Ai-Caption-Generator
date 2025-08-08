const generateCaption = require("../services/ai.service");

const createPostController = async (req, res) => {
  const file = req.file;
  const base64Image = Buffer.from(file.buffer).toString("base64");

  try {
    const caption = await generateCaption(base64Image);
    res.status(200).json({ message: "Caption Generated Succesfully", caption });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createPostController;

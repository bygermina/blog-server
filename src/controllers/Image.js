const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Image = require('../models/Image');

const IMAGE_NOT_FOUND = 'Image not found';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class ImageController {
  uploadImage = upload.single('image');

  async createImage(req, res) {
    try {
      const { imagename } = req.params;
      const existingImage = await Image.findOne({
        where: { filename: imagename },
      });

      if (existingImage) {
        fs.unlinkSync(existingImage.path);

        const { path, mimetype, size } = req.body;

        await existingImage.update({
          filename: imagename,
          path,
          mimetype,
          size,
        });

        res.status(200).json(path);
      } else {
        const { path, mimetype, size } = req.file;

        const newImage = await Image.create({
          filename: imagename,
          path,
          mimetype,
          size,
        });

        res.status(200).json(path);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getImage(req, res) {
    try {
      const { id } = req.params;
      const image = await Image.findByPk(id);

      if (!image) {
        return res.status(404).json({ error: IMAGE_NOT_FOUND });
      }

      res.sendFile(path.resolve(image.path));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteImage(req, res) {
    try {
      const { id } = req.params;
      const image = await Image.findByPk(id);

      if (!image) {
        return res.status(404).json({ error: IMAGE_NOT_FOUND });
      }

      fs.unlinkSync(image.path);
      await image.destroy();

      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ImageController();

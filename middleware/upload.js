const multer = require('multer');
const path = require('path');
const AppError = require('../utils/appError');

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// التحقق من نوع الملف
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new AppError('Only images are allowed (jpeg, jpg, png, gif, webp)', 400), false);
  }
};

// إعداد multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // حد أقصى 5 ميجابايت لكل صورة
  },
});

// دالة للتحقق من أبعاد الصورة باستخدام sharp
const validateImageDimensions = async (filePath, minWidth = 300, minHeight = 300) => {
  const sharp = require('sharp');
  const metadata = await sharp(filePath).metadata();
  
  if (metadata.width < minWidth || metadata.height < minHeight) {
    throw new AppError(`Image must be at least ${minWidth}x${minHeight} pixels`, 400);
  }
  
  return metadata;
};

module.exports = {
  upload,
  validateImageDimensions,
};
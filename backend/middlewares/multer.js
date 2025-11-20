// middleware/multer.js
const multer = require('multer');

// We'll store the file in memory temporarily
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;

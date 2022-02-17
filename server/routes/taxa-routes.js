const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');
// const { randomUUID } = require('crypto');

// const path = require('path');

// const uploadPath = path.resolve(__dirname, 'uploads');
// // const uuidv4 = require('uuid/v4');
// // const upload_dir = './public/uploads';
// const upload_dir = './_storage/uploads';

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, upload_dir);
//   },
//   filename: (req, file, callback) => {
//     // console.log(file);
//     const uuidv4_token = uuidv4()
//     callback(null, `${uuidv4_token}-${file.originalname.replace(/ /g,"_").toLowerCase()}`);
//    },

// })

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'video/mp4' ||
//       file.mimetype === 'video/webm' ||
//       file.mimetype === 'video/ogg' ||
//       file.mimetype === 'video/quicktime') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error(`Only mp4, webm, mov and ogg supported ${file.mimetype} is not supported.`));
//     }
//   }

// });


const taxaRoutes = require('./../controllers/taxa-controller.js');

const router = express.Router()

router.get('/list', taxaRoutes.taxaAll);

router.post('/goDeep', taxaRoutes.goDeep);

router.post('/goUp', taxaRoutes.goUp)

// router.put('/delete', moviesRoutes.moviesDelete);

// router.patch('/update', upload.single('filepath'),  moviesRoutes.moviesUpdate);

// router.put('/resetListDB', moviesRoutes.playlistReset);

module.exports = router;
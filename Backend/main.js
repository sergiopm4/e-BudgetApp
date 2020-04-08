const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { check, validationResult } = require('express-validator');
// const helmet = require('helmet');
const cors = require('cors');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const User = require('./models/User.model');

let secrets = fs.readFileSync('./config/secrets.json');
secrets = JSON.parse(secrets);

// const dbController = require('./controller/db.controller');
const authController = require('./controllers/auth.controller');

const server = express();

//.Middlewares
// server.use(helmet());
server.use(bodyParser.json());
server.use(cors());
// server.use(cookieParser());

//.Endpoints --> /register && /login
server.post('/register', [check('email', 'The email is not valid').not().isEmpty().isEmail().normalizeEmail(), check('password', 'Password must have at least 8 characters').not().isEmpty().isLength({ min: 8 })], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
    } else {
        authController.register(req, res);
    }
});

server.post('/login', authController.login);





// // Upload IMG.
// const storageConfig = multer.diskStorage({ destination: './uploads/' });
// const fileFilter = (req, file, callBack) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         //null no arroja error pero no sube el archivo.
//         callBack(null, true);
//     } else {
//         callBack(null, false);
//     }
// }

// const upload = multer({
//     storage: storageConfig,
//     limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter
// })



// server.post('/file', upload.single('file'), (req, res) => {
//     const file = req.file;
//     // console.log(file.filename);
//     if (!file) {
//         res.send({ 'error': 'FILE_NOT_FOUND' });
//     } else {
//         //. Subir la imagen a Cloudinary
//         cloudinary.config({
//             cloud_name: secrets['cloudinary_cloud_name'],
//             api_key: secrets['cloudinary_api_key'],
//             api_secret: secrets['cloudinary_api_secret']
//         })

//         const filePath = req.file.path;
//         const fileRandomName = Date.now();

//         cloudinary.uploader.upload(filePath, { public_id: `api/${fileRandomName}`, tags: 'user_image' }, (error, image) => {
//             if (error) throw error;
//             //. Borra imagen del server carpeta de uploads
//             fs.unlinkSync(filePath);
//             res.send(image);
//         })

//     }
// })





// //.Endpoints Cases
// server.post('/postCase', dbController.postOneCase);

// server.get('/getAllCases', dbController.getAllCases);

// server.get('/getOneCase/:id', dbController.getOneCase);

// server.put('/editOneCase', dbController.editOneCase);

// server.delete('/deleteOneCase/:id', dbController.deleteOneCase);

// //.Endpoints User
// server.post('/createUser', dbController.createUser);

// server.get('/getAllUsers', dbController.getAllUsers);

// server.get('/getOneUser/:id', dbController.getOneUser);

// server.put('/editOneUser', dbController.editOneUser);

// server.delete('/deleteOneUser/:id', dbController.deleteOneUser);


server.listen(3000, () => {
    console.log('Server listening on port 3000');
})





// const multer=require('multer');
// const firebase=require('../config/firebase.config');

// // const firebaseStorage=require('multer-firebase-storage');

// // const serviceAccount=require('../drive-2b76e-firebase-adminsdk-fbsvc-f2df9fca48.json');


// // const storage=firebaseStorage({
// //     Credentials:firebase.credential.cert(serviceAccount),
// //     BucketName:'drive-2b76e.appspot.com',
// // })

// // const upload=multer({
// //   storage:storage
// // });

// // module.exports=upload;


// require('dotenv').config();
// const FirebaseStorage = require('multer-firebase-storage');
// const serviceAccount = require('../drive-2b76e-firebase-adminsdk-fbsvc-f2df9fca48.json');

// const storage =FirebaseStorage({
//   bucketName: process.env.FIREBASE_BUCKET_NAME,
//   credentials: {
//     projectId: serviceAccount.project_id,
//     clientEmail: serviceAccount.client_email,
//     privateKey: serviceAccount.private_key
//   }
// });

// module.exports = storage;

require('dotenv').config();
const multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');
const serviceAccount = require('../drive-2b76e-firebase-adminsdk-fbsvc-f2df9fca48.json');

const storage = FirebaseStorage({
  bucketName: process.env.FIREBASE_BUCKET_NAME,
  credentials: {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key
  }
});

const upload = multer({ storage }); // ✅ wrap it here

module.exports = upload; // ✅ export the multer instance
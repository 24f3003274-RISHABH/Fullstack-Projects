const Firebase=require('firebase-admin');

const serviceAccount=require('../drive-2b76e-firebase-adminsdk-fbsvc-f2df9fca48.json')


const firebase=Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket : 'drive-2b76e.appspot.com'
})


module.exports=Firebase;
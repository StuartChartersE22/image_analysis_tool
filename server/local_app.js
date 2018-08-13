const VisualRecognitionURL = require(`./models/visual_recognition_url.js`);
const VisualRecognitionLocal = require(`./models/visual_recognition_local.js`);

const visRecURL = new VisualRecognitionURL();
// visRecURL.classify(`https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg`);
// visRecURL.detectFaces(`https://i1.wp.com/codeclan.com/wp-content/uploads/2016/03/Being-a-Student-at-CodeClan.jpg?fit=616%2C300&ssl=1`);

const visRecLocal = new VisualRecognitionLocal([`default`], 0.6);
// visRecLocal.classify('1_xNGCocsmmxysEr1kuxgjCA.png');
// visRecLocal.detectFaces('instructors.zip');

const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const apiKey = require(`../config.js`)
const fs = require('fs');

class VisualRecognitionLocal extends VisualRecognitionV3 {

  constructor(classifiers = [`default`], threshold = 0.6) {
    super({
      version: "2018-01-08",
      iam_apikey: apiKey.VisualRecognitionAPI
    });

    this.classifiers = classifiers;
    this.threshold = threshold;

  }

  classify(images) {
    const params = {
      images_file: fs.createReadStream(`./public/images/${images}`),
      classifier_ids: this.classifiers,
      threshold: this.threshold
    };
    super.classify(params, (err, res) => {
      if (err)
        console.error(err);
      else
        return res;
    });
  };

  detectFaces(image) {
    const params = {
      images_file: fs.createReadStream(`./public/images/${image}`)
    };
    super.detectFaces(params, (err, res) => {
      if (err)
        console.error(err);
      else
        return res;
    });
  }

};

module.exports = VisualRecognitionLocal;

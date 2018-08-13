const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const apiKey = require(`../config.js`)

class VisualRecognitionURL extends VisualRecognitionV3 {

  constructor(classifiers = [`default`], threshold = 0.6) {
    super({
      version: "2018-01-08",
      iam_apikey: apiKey.VisualRecognitionAPI
    });

    this.classifiers = classifiers;
    this.threshold = threshold;

  }

  classify(image) {
    console.log(`defining params`);
    const params = {
      url: image,
      classifier_ids: this.classifiers,
      threshold: this.threshold,
      owners: `IBM`
    };
    console.log(`calling super method`);
    super.classify(params, (err, res) => {
      if (err)
        console.error(err);
      else
        console.log(JSON.stringify(res));
        return JSON.stringify(res);
    });
  };

  detectFaces(image) {
    const params = {
      url: image
    };
    super.detectFaces(params, (err, res) => {
      if (err)
        console.error(err);
      else
        return JSON.stringify(res);
    });
  }

};

module.exports = VisualRecognitionURL;

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
const apiKey = require(`./config.js`)
const fs = require('fs');

const params = {
  classifier_ids: ['default'],
  threshold: 0.6,
  owners: `IBM`
};

const visualRecognition = new VisualRecognitionV3({
  version: "2018-01-08",
  iam_apikey: apiKey.VisualRecognitionAPI
});

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));
app.use(bodyParser.json());

//CREATE
app.post(`/api/images/file`, (req, response) => {
  const src = req.body.src;
  const analysisChoice = req.body.analysisChoice;
  params[`images_file`] = src;
  if(analysisChoice === `classify`){
    visualRecognition.classify(params, (err, res) => {
      if (err)
        console.error(err);
      else
        console.log(JSON.stringify(res, null, 2));
        response.json(res);
    });
  }else if (analysisChoice === `face-recognition`) {
    visualRecognition.detectFaces(params, (err, res) => {
      if (err)
        console.error(err);
      else
        console.log(JSON.stringify(res, null, 2));
        response.json(res);
    });
  };
});

app.post(`/api/images/url`, (req, response) => {
  const src = req.body.src;
  const analysisChoice = req.body.analysisChoice;
  params[`url`] = src;
  if(analysisChoice === `classify`){
    visualRecognition.classify(params, (err, res) => {
      if (err)
        console.error(err);
      else
        console.log(JSON.stringify(res, null, 2));
        response.json(res);
    });
  }else if (analysisChoice === `face-recognition`) {
    visualRecognition.detectFaces(params, (err, res) => {
      if (err)
        console.error(err);
      else
        console.log(JSON.stringify(res, null, 2));
        response.json(res);
    });
  };
});

app.listen(3000, function () {
  console.log(`App running on port ${ this.address().port }`);
});
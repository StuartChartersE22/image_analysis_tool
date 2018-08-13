const SubmissionView = require('./views/submission.js');
const ImageView = require(`./views/image.js`)
const ClassResultProcessor = require(`./models/class_result_processor.js`);
const FaceResultProcessor = require(`./models/face_result_processor.js`);
const ResultView = require(`./views/result.js`);
const DetailView = require(`./views/details.js`);
// const ImageFaceCombiner = require('./models/image_face_combiner.js');
// const ImageView = require('./views/image.js');

document.addEventListener('DOMContentLoaded', () => {

  const detailContainer = document.querySelector(`div.information-display`)
  const submissionView = new SubmissionView(detailContainer);
  submissionView.bindingEvents();

  const imageContainer = document.querySelector(`div.image-container`);
  const imageView = new ImageView(imageContainer);
  imageView.bindingEvents();

  ClassResultProcessor.bindingEvents();
  FaceResultProcessor.bindingEvents();
  ResultView.bindingEvents();

  const detailView = new DetailView(detailContainer);
  detailView.bindingEvents();

});

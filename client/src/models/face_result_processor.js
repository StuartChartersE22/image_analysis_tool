const PubSub = require('../helpers/pub_sub.js');
const Processor = require(`./processor`);

const FaceResultProcessor = {
  bindingEvents: () => {
    PubSub.subscribe(`FaceResultProcessor:face-results`, (evt) => {
      const processedResults = Processor.process(evt, faceData);
      PubSub.publish(`Result:face-results`, processedResults);
    })
  }

};

module.exports = FaceResultProcessor;

function faceData(results) {
  const processedData = results.faces.reduce((map, face) => {
    const faceBox = createFaceBox(face.face_location);
    const details = createDetailList(face);
    map.set(faceBox, details);
    return map;
  }, new Map());
  return processedData;
}

//TODO: Use hmtl canvas element to translate the coordinates to a box around the face and link the box to the details: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
function createFaceBox(faceLocationData) {
  const locationPX = {
    left: faceLocationData.left,
    top: faceLocationData.top
  };
  const faceSizePX = {
    height: faceLocationData.height,
    width: faceLocationData.width
  };
  return {
    locationPX: locationPX,
    faceSizePX: faceSizePX
  };
}

function createDetailList(face) {
  const list = document.createElement(`ul`);

  const ageDetails = document.createElement(`li`);
  const ageRange = `Age between: ${face.age.min} - ${face.age.max}, confidence: ${face.age.score}`;
  ageDetails.textContent = ageRange;
  list.appendChild(ageDetails);

  const genderDetails = document.createElement(`li`);
  const gender = `Gender: ${face.gender.gender}, confidence: ${face.gender.score}`;
  genderDetails.textContent = gender;
  list.appendChild(genderDetails);

  return list;
}

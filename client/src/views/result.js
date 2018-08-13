const PubSub = require('../helpers/pub_sub.js');

const Result = {
  bindingEvents: () => {
    PubSub.subscribe(`Result:class-results`, (evt) => {
      const results = evt.detail;
      if(Object.keys(results).length === 1){
        const keyValueArray = Object.entries(results)[0];
        const src = keyValueArray[0];
        const classifiers = keyValueArray[1];
        PubSub.publish(`Image:image-entered`, src);
        PubSub.publish(`Details:class-details-entered`, classifiers)
      }else {
        console.dir(Object.keys(results));
      }
    });

    PubSub.subscribe(`Result:face-results`, (evt) => {
      const results = evt.detail;
      if(Object.keys(results).length === 1){
        const keyValueArray = Object.entries(results)[0];
        const src = keyValueArray[0];
        const faceData = keyValueArray[1];
        PubSub.publish(`Image:image-entered`, src);
        PubSub.publish(`Details:face-details-entered`, faceData);
      }else {
        console.dir(Object.keys(results));
      }
    });
  }



};

module.exports = Result;

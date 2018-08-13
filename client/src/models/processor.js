
const Processor = {
  process: (evt, dataList) => {
    const results = evt.detail.images;
    const processedResults = results.reduce((resultsObject, result) => {
      let key = null;
      // result.image would be the original src in a non demo, actual submission
      // relative path produced here from submitting the demo data to local_app.js
      if (result.image){
        key = `images/${result.image}`;
      }else {
        key = result.source_url;
      };
      resultsObject[key] = dataList(result);
      return resultsObject;
    }, {});
    return processedResults;
  }
}

module.exports = Processor;

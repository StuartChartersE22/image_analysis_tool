const PubSub = require('../helpers/pub_sub.js');
const Processor = require(`./processor`);

const ClassResultProcessor = {
  bindingEvents: () => {
    PubSub.subscribe(`ClassResultProcessor:class-results`, (evt) => {
      const processedResults = Processor.process(evt, classifierList);
      PubSub.publish(`Result:class-results`, processedResults);
    });
  }
}

module.exports = ClassResultProcessor;

const addCLass = (list, item) => {
  const listItem = document.createElement(`li`);
  listItem.classList.add(`class`);
  listItem.textContent = `${item.class}, confidence: ${item.score}`;
  list.appendChild(listItem);
  return list;
};

function classifierList(result) {
  return result.classifiers.map(classifier => {
    const label = createClassifierName(classifier.name);
    const classes = classifier.classes
      .sort((a, b) => b.score - a.score)
      .reduce(addCLass, document.createElement('ol'));
    classes.classList.add(`class-list`);
    classes.id = classifier.name;
    return {
      label: label,
      classes: classes
    };
  });
};

function createClassifierName(name) {
  const label = document.createElement(`label`);
  label.htmlFor = name;
  label.textContent = name + ` classification:`;
  label.classList.add(`classifier-name`);
  return label;
};

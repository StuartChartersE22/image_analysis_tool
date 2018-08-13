const PubSub = require('../helpers/pub_sub.js');
const Image = require(`./image.js`)

const addClassifier = (list, detail) => {
  const listItem = document.createElement(`li`);
  listItem.classList.add(`classifier`);
  listItem.appendChild(detail.label);
  listItem.appendChild(detail.classes);
  list.appendChild(listItem);
  return list;
}

class Details {
  constructor(container) {
    this.container = container;
  };

  bindingEvents(){
    PubSub.subscribe(`Details:class-details-entered`, evt => {
      this.setup();
      const details = evt.detail;
      const classifiers = details.reduce(addClassifier, document.createElement(`ul`));
      classifiers.classList.add(`classifiers`);
      this.container.appendChild(classifiers);
    });

    PubSub.subscribe(`Details:face-details-entered`, (evt) => {
      this.setup();
      const details = evt.detail;
      const detailList = document.createElement(`ul`);
      detailList.classList.add(`face-details`);
      details.forEach((faceDetails, faceLocation) => {

        const listItem = document.createElement(`li`);
        listItem.classList.add(`face-entry`);

        const location = document.createElement(`p`);
        location.textContent = `Location: left ${faceLocation.locationPX.left}px, top ${faceLocation.locationPX.top}px`;

        listItem.appendChild(location);
        listItem.appendChild(faceDetails);

        detailList.appendChild(listItem);
      });
      this.container.appendChild(detailList);
    })
  };

  setup(){
    empty(this.container);
    const reset = document.createElement(`button`);
    reset.textContent = `Reset`
    this.container.appendChild(reset);
    reset.addEventListener(`click`, () => {
      PubSub.publish(`Submission:reset`, null);
      PubSub.publish(`Image:reset`, null);
    })
  };
}

module.exports = Details;

function empty(container) {
  container.innerHTML = ``;
}

// function addClassifier(list, detail) {
//   const listItem = document.createElement(`li`);
//   listItem.classList.add(`classifier`);
//   listItem.appendChild(detail.label);
//   listItem.appendChild(detail.classes);
//   list.appendChild(listItem);
// }

const PubSub = require('../helpers/pub_sub.js');

class Image {
  constructor(container) {
    this.container = container;
  };

  bindingEvents(){

    PubSub.subscribe(`Image:image-entered`, (evt) => {
      const src = evt.detail;
      empty(this.container);
      const image = document.createElement(`img`);
      image.id = `submitted-image`
      image.src = src;
      this.container.appendChild(image);
    });

    PubSub.subscribe(`Image:reset`, () => {
      empty(this.container);
    })

  };

};

module.exports = Image;

function empty(element) {
  element.innerHTML = ``;
}

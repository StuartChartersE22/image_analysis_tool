const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

class Submission {
  constructor(container) {
    this.container = container;
    this.form = null;
    this.input = null;
  };

  bindingEvents(){
    this.reset();

    PubSub.subscribe(`Submission:reset`, () => {
      this.reset();
    })
  };

  reset() {
    empty(this.container);
    addInputOptions(this.container);
    this.form = createForm();
    this.container.appendChild(this.form);
    const inputSelector = document.querySelector(`radiogroup`)

    inputSelector.addEventListener(`change`, (evt) => {
      const inputType = evt.target.value;
      this.input = inputType;
      displayInput(inputType, this.form);
    });

    this.form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      let src = imageSRC(evt.target[this.input], this.input);
      const analysisChoice = evt.target.analysisOption.value;
      const submission = {
        analysisChoice: analysisChoice,
        src: src
      };
      const request = new Request(`api/images/${this.input}`);
      request.post(submission).then((res) => {
        if(analysisChoice === `classify`){
          PubSub.publish(`ClassResultProcessor:class-results`, res);
        }else if (analysisChoice === `face-recognition`) {
          PubSub.publish(`FaceResultProcessor:face-results`, res);
        };
      });
    });
  };

};

module.exports = Submission;

function addInputOptions(container) {
  const label = document.createElement(`label`);
  label.htmlFor = `input-option`;
  label.textContent = `Analysis options:`
  const radiogroup = document.createElement(`radiogroup`);
  radiogroup.id = `input-option`;
  radiogroup.classList.add(`type-choice`);
  addTypeOption(`URL`, `imageInput`, radiogroup);
  addTypeOption(`File`, `imageInput`, radiogroup);
  container.appendChild(label);
  container.appendChild(radiogroup);
}

function createForm() {
  const form = document.createElement(`form`);
  form.classList.add(`image-submission`);
  return form;
}

function displayInput(inputType, form) {
  empty(form);
  const input = document.createElement(`input`);
  input.type = inputType;
  input.name = `${inputType}`;
  if(inputType === `file`){
    input.accept = ".png, .jpg, .jpeg, .zip"
  }
  input.id = `image-input`;
  form.appendChild(input);

  input.addEventListener(`input`, (evt) => {
    const src = imageSRC(evt.target, inputType)
    PubSub.publish(`Image:image-entered`, src);
  });

  addAnalysisOptions(form);
  addSubmitButton(form);
};

function empty(element) {
  element.innerHTML = ``;
};

function imageSRC(selectionResult, inputType) {
  if(inputType === `file`){
    return window.URL.createObjectURL(selectionResult.files[0]);
  }else if (inputType === `url`) {
    return selectionResult.value;
  };
};

function addSubmitButton(form) {
  const submitButton = document.createElement(`input`);
  submitButton.type = `submit`;
  submitButton.value = `Analyse`;
  submitButton.classList.add(`bttn`);
  form.appendChild(submitButton);
};

function addAnalysisOptions(form) {
  const analysisOptions = document.createElement(`radiogroup`);
  analysisOptions.classList.add(`type-choice`);
  addTypeOption(`Classify`, `analysis`, analysisOptions);
  addTypeOption(`Face-recognition`, `analysis`, analysisOptions);
  form.appendChild(analysisOptions);
};

function addTypeOption(name, typeOf, radiogroup) {
  const typeOption = document.createElement(`input`);
  typeOption.type = `radio`;
  typeOption.name = `${typeOf}Option`;
  typeOption.value = name.toLowerCase();
  typeOption.id = name;
  typeOption.required = true;

  const label = document.createElement(`label`);
  label.htmlFor = name;
  label.textContent = name;

  radiogroup.appendChild(label);
  radiogroup.appendChild(typeOption);
}

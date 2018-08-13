const PubSub = require('../helpers/pub_sub.js');

class VisualRecognition {
  constructor(classifiers = [`default`], threshold = 0.6) {
    this.classifiers = classifiers;
    this.threshold = threshold;
  };

  bindingEvents(){

    PubSub.subscribe(`VisualRecognition:image-submitted`, evt => {
      const src = evt.detail.src;
      const analysisChoice = evt.detail.analysisChoice;
      if(analysisChoice === `classify`){
        const classResults = this.classify(src);
        PubSub.publish(`ClassResultProcessor:class-results`, classResults);
      }else if (analysisChoice === `face-recognition`) {
        const faceResults = this.detectFaces(src);
        PubSub.publish(`FaceResultProcessor:face-results`, faceResults);
      }
    });

  }

  classify(images){
    if(images === `bike-in-kyrgyzstan.jpg`){
      return {
        "images": [
          {
            "classifiers": [
              {
                "classifier_id": "default",
                "name": "default",
                "classes": [
                  {
                    "class": "col (mountain pass)",
                    "score": 0.855,
                    "type_hierarchy": "/nature/col (mountain pass)"
                  },
                  {
                    "class": "nature",
                    "score": 0.974
                  },
                  {
                    "class": "ascent",
                    "score": 0.829,
                    "type_hierarchy": "/nature/slope/ascent"
                  },
                  {
                    "class": "slope",
                    "score": 0.883
                  },
                  {
                    "class": "natural elevation",
                    "score": 0.801
                  },
                  {
                    "class": "ultramarine color",
                    "score": 0.609
                  }
                ]
              }
            ],
            "image": "bike-in-kyrgyzstan.jpg"
          }
        ],
        "images_processed": 1,
        "custom_classes": 0
      };
    }else if (images === `https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg`) {
      return {
        "images": [{
          "classifiers": [{
            "classifier_id": "default",
            "name": "default",
            "classes": [{
              "class": "fruit",
              "score": 0.788
            }, {
              "class": "olive color",
              "score": 0.973
            }, {
              "class": "lemon yellow color",
              "score": 0.789
            }]
          }],

          "source_url": "https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg",

          "resolved_url": "https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg"
        }],
        "images_processed": 1,
        "custom_classes": 0
      };
    }else if (images === `images.zip`) {
      return {
        "images": [
          {
            "classifiers": [
              {
                "classifier_id": "default",
                "name": "default",
                "classes": [
                  {
                    "class": "col (mountain pass)",
                    "score": 0.855,
                    "type_hierarchy": "/nature/col (mountain pass)"
                  },
                  {
                    "class": "nature",
                    "score": 0.974
                  },
                  {
                    "class": "ascent",
                    "score": 0.829,
                    "type_hierarchy": "/nature/slope/ascent"
                  },
                  {
                    "class": "slope",
                    "score": 0.883
                  },
                  {
                    "class": "natural elevation",
                    "score": 0.801
                  },
                  {
                    "class": "ultramarine color",
                    "score": 0.609
                  }
                ]
              }
            ],
            "image": "images.zip/images/bike-in-kyrgyzstan.jpg"
          },
          {
            "classifiers": [
              {
                "classifier_id": "default",
                "name": "default",
                "classes": [
                  {
                    "class": "fruit",
                    "score": 0.788
                  },
                  {
                    "class": "olive color",
                    "score": 0.973
                  },
                  {
                    "class": "lemon yellow color",
                    "score": 0.789
                  }
                ]
              }
            ],
            "image": "images.zip/images/fruitbowl.jpg"
          },
          {
            "classifiers": [
              {
                "classifier_id": "default",
                "name": "default",
                "classes": [
                  {
                    "class": "alpinist",
                    "score": 0.735,
                    "type_hierarchy": "/person/contestant/athlete/alpinist"
                  },
                  {
                    "class": "athlete",
                    "score": 0.735
                  },
                  {
                    "class": "contestant",
                    "score": 0.735
                  },
                  {
                    "class": "person",
                    "score": 0.736
                  },
                  {
                    "class": "nature",
                    "score": 0.877
                  },
                  {
                    "class": "natural elevation",
                    "score": 0.801
                  },
                  {
                    "class": "ultramarine color",
                    "score": 0.889
                  },
                  {
                    "class": "blue color",
                    "score": 0.699
                  }
                ]
              }
            ],
            "image": "images.zip/images/me-on-half-dome.jpg"
          },
          {
            "classifiers": [
              {
                "classifier_id": "default",
                "name": "default",
                "classes": [
                  {
                    "class": "person",
                    "score": 0.799
                  },
                  {
                    "class": "people",
                    "score": 0.936
                  },
                  {
                    "class": "alizarine red color",
                    "score": 0.936
                  }
                ]
              }
            ],
            "image": "images.zip/images/Being-a-Student-at-CodeClan.jpg"
          }
        ],
        "images_processed": 4,
        "custom_classes": 0
      };
    }else {
      return console.error(`This is just a demo. If you would like to classify new images, please run local_app.js in terminal.`);;
    };
  };

  detectFaces(images) {
    if (images === `me-on-half-dome.jpg`){
      return {
        "images": [
          {
            "faces": [
              {
                "age": {
                  "min": 30,
                  "max": 33,
                  "score": 0.74098295
                },
                "face_location": {
                  "height": 1134,
                  "width": 931,
                  "left": 552,
                  "top": 1705
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9999858
                }
              }
            ],
            "image": "me-on-half-dome.jpg"
          }
        ],
        "images_processed": 1
      };
    }else if (images === `https://i1.wp.com/codeclan.com/wp-content/uploads/2016/03/Being-a-Student-at-CodeClan.jpg?fit=616%2C300&ssl=1`) {
      return {
        "images":[{"faces":[

          {"age":{"min":33,"max":36,"score":0.79770654},"face_location":{"height":42,"width":38,"left":184,"top":12},"gender":{"gender":"MALE","score":0.9998456}},

          {"age":{"min":28,"max":31,"score":0.84059805},"face_location":{"height":56,"width":49,"left":192,"top":102},"gender":{"gender":"MALE","score":0.9903943}},

          {"age":{"min":28,"max":32,"score":0.7700212},"face_location":{"height":46,"width":42,"left":498,"top":99},"gender":{"gender":"FEMALE","score":0.98773265}},

          {"age":{"min":26,"max":28,"score":0.99978405},"face_location":{"height":57,"width":55,"left":386,"top":190},"gender":{"gender":"MALE","score":0.9997844}},

          {"age":{"min":23,"max":26,"score":0.9343846},"face_location":{"height":49,"width":43,"left":377,"top":71},"gender":{"gender":"MALE","score":0.9999546}},

          {"age":{"min":23,"max":26,"score":0.7332587},"face_location":{"height":54,"width":55,"left":311,"top":193},"gender":{"gender":"MALE","score":0.9768664}},

          {"age":{"min":23,"max":26,"score":0.9294257},"face_location":{"height":43,"width":40,"left":309,"top":80},"gender":{"gender":"MALE","score":0.99700326}},

          {"age":{"min":22,"max":25,"score":0.8142347},"face_location":{"height":42,"width":35,"left":66,"top":112},"gender":{"gender":"FEMALE","score":0.9862649}},

          {"age":{"min":20,"max":24,"score":0.7459947},"face_location":{"height":39,"width":35,"left":244,"top":54},"gender":{"gender":"MALE","score":0.9963044}},

          {"age":{"min":20,"max":24,"score":0.84310365},"face_location":{"height":37,"width":33,"left":315,"top":26},"gender":{"gender":"MALE","score":0.9956612}},

          {"age":{"min":20,"max":23,"score":0.8682834},"face_location":{"height":44,"width":34,"left":2,"top":66},"gender":{"gender":"MALE","score":0.9429132}}],

        "source_url":"https://i1.wp.com/codeclan.com/wp-content/uploads/2016/03/Being-a-Student-at-CodeClan.jpg?fit=616%2C300&ssl=1","resolved_url":"https://i1.wp.com/codeclan.com/wp-content/uploads/2016/03/Being-a-Student-at-CodeClan.jpg?fit=616%2C300&ssl=1"}],"images_processed":1
      };
    }else if (images === `images.zip`) {
      return {
        "images": [
          {
            "faces": [
              {
                "age": {
                  "min": 43,
                  "max": 52,
                  "score": 0.2462264
                },
                "face_location": {
                  "height": 89,
                  "width": 101,
                  "left": 383,
                  "top": 104
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.98661846
                }
              }
            ],
            "image": "images.zip/images/fruitbowl.jpg"
          },
          {
            "faces": [
              {
                "age": {
                  "min": 33,
                  "max": 36,
                  "score": 0.79770654
                },
                "face_location": {
                  "height": 42,
                  "width": 38,
                  "left": 184,
                  "top": 12
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9998456
                }
              },
              {
                "age": {
                  "min": 28,
                  "max": 31,
                  "score": 0.84059805
                },
                "face_location": {
                  "height": 56,
                  "width": 49,
                  "left": 192,
                  "top": 102
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9903943
                }
              },
              {
                "age": {
                  "min": 28,
                  "max": 32,
                  "score": 0.7700212
                },
                "face_location": {
                  "height": 46,
                  "width": 42,
                  "left": 498,
                  "top": 99
                },
                "gender": {
                  "gender": "FEMALE",
                  "score": 0.98773265
                }
              },
              {
                "age": {
                  "min": 26,
                  "max": 28,
                  "score": 0.99978405
                },
                "face_location": {
                  "height": 57,
                  "width": 55,
                  "left": 386,
                  "top": 190
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9997844
                }
              },
              {
                "age": {
                  "min": 23,
                  "max": 26,
                  "score": 0.9343846
                },
                "face_location": {
                  "height": 49,
                  "width": 43,
                  "left": 377,
                  "top": 71
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9999546
                }
              },
              {
                "age": {
                  "min": 23,
                  "max": 26,
                  "score": 0.7332587
                },
                "face_location": {
                  "height": 54,
                  "width": 55,
                  "left": 311,
                  "top": 193
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9768664
                }
              },
              {
                "age": {
                  "min": 23,
                  "max": 26,
                  "score": 0.9294257
                },
                "face_location": {
                  "height": 43,
                  "width": 40,
                  "left": 309,
                  "top": 80
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.99700326
                }
              },
              {
                "age": {
                  "min": 22,
                  "max": 25,
                  "score": 0.8142347
                },
                "face_location": {
                  "height": 42,
                  "width": 35,
                  "left": 66,
                  "top": 112
                },
                "gender": {
                  "gender": "FEMALE",
                  "score": 0.9862649
                }
              },
              {
                "age": {
                  "min": 20,
                  "max": 24,
                  "score": 0.7459947
                },
                "face_location": {
                  "height": 39,
                  "width": 35,
                  "left": 244,
                  "top": 54
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9963044
                }
              },
              {
                "age": {
                  "min": 20,
                  "max": 24,
                  "score": 0.84310365
                },
                "face_location": {
                  "height": 37,
                  "width": 33,
                  "left": 315,
                  "top": 26
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9956612
                }
              },
              {
                "age": {
                  "min": 20,
                  "max": 23,
                  "score": 0.8682834
                },
                "face_location": {
                  "height": 44,
                  "width": 34,
                  "left": 2,
                  "top": 66
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9429132
                }
              }
            ],
            "image": "images.zip/images/Being-a-Student-at-CodeClan.jpg"
          },
          {
            "faces": [],
            "image": "images.zip/images/bike-in-kyrgyzstan.jpg"
          },
          {
            "faces": [
              {
                "age": {
                  "min": 30,
                  "max": 33,
                  "score": 0.74098295
                },
                "face_location": {
                  "height": 1134,
                  "width": 931,
                  "left": 552,
                  "top": 1705
                },
                "gender": {
                  "gender": "MALE",
                  "score": 0.9999858
                }
              }
            ],
            "image": "images.zip/images/me-on-half-dome.jpg"
          }
        ],
        "images_processed": 4
      };
    }else {
      return console.error(`This is just a demo. If you would like to recognise faces in a new images, please run local_app.js in terminal.`);;
    };
  };

};

module.exports = VisualRecognition;
